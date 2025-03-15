'use server';

import {revalidatePath} from 'next/cache';

import {ID, Models, Query} from 'node-appwrite';
import {InputFile} from 'node-appwrite/file';

import {GetFilesProps, UploadFileProps} from '@/types';

import {createAdminClient} from '../appwrite';
import {appwriteConfig} from '../appwrite/config';
import {constructFileUrl, getFileType, parseStringify} from '../utils';
import {getCurrentUser} from './user-actions';

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const uploadFile = async ({
  file,
  ownerID,
  accountID,
  path
}: UploadFileProps) => {
  const {storage, databases} = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const fileDocument = {
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      type: getFileType(bucketFile.name).type,
      bucketFileID: bucketFile.$id,
      accountID,
      owner: ownerID,
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      users: []
    };

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, 'Failed to create file document');
      });

    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, 'Failed to upload file');
  }
};

const createQueries = (
  currentUser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number
) => {
  const queries = [
    Query.or([
      Query.equal('owner', [currentUser.$id]),
      Query.contains('users', [currentUser.email])
    ])
  ];

  if (types.length > 0) queries.push(Query.equal('type', types));
  if (searchText) queries.push(Query.contains('name', searchText));
  if (limit) queries.push(Query.limit(limit));

  if (sort) {
    const [sortBy, orderBy] = sort.split('-');

    queries.push(
      orderBy === 'asc' ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy)
    );
  }

  return queries;
};

export const getFiles = async ({
  types = [],
  searchText = '',
  sort = '$createdAt-desc',
  limit
}: GetFilesProps) => {
  const {databases} = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) throw new Error('User not found');

    const queries = createQueries(currentUser, types, searchText, sort, limit);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries
    );

    return parseStringify(files);
  } catch (error) {
    handleError(error, 'Failed to get files');
  }
};
