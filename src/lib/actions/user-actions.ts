'use server';

import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

import {ID, Query} from 'node-appwrite';

import {createAdminClient, createSessionClient} from '../appwrite';
import {appwriteConfig} from '../appwrite/config';
import {parseStringify} from '../utils';

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const getUserByEmail = async (email: string) => {
  const {databases} = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal('email', [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailOTP = async ({email}: {email: string}) => {
  const {account} = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, 'Failed to send email OTP');
  }
};

export const createAccount = async ({
  fullName,
  email
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);
  const accountID = await sendEmailOTP({email});

  if (!accountID) throw new Error('Failed to send email OTP');
  if (!existingUser) {
    const {databases} = await createAdminClient();
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        accountID,
        avatar: '/images/avatar.png'
      }
    );
  }

  return parseStringify({accountID});
};

export const login = async ({email}: {email: string}) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      await sendEmailOTP({email});
      return parseStringify({accountID: existingUser.accountID});
    }

    return parseStringify({accountID: null, error: 'Account not found'});
  } catch (error) {
    handleError(error, 'Failed to log in user');
  }
};

export const logout = async () => {
  const {account} = await createSessionClient();

  try {
    await account.deleteSession('current');
    (await cookies()).delete('appwrite-session');
  } catch (error) {
    handleError(error, 'Failed to log out user');
  } finally {
    redirect('/login');
  }
};

export const getCurrentUser = async () => {
  try {
    const {databases, account} = await createSessionClient();

    const result = await account.get();
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountID', result.$id)]
    );

    if (user.total <= 0) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    handleError(error, 'Failed to get current user');
  }
};

export const verifySecret = async ({
  accountID,
  otp
}: {
  accountID: string;
  otp: string;
}) => {
  try {
    const {account} = await createAdminClient();
    const session = await account.createSession(accountID, otp);

    (await cookies()).set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    });

    return parseStringify({sessionID: session.$id});
  } catch (error) {
    handleError(error, 'Failed to verify OTP');
  }
};
