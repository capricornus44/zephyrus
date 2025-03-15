export type AuthFormType = 'login' | 'register';

export type FileType = 'document' | 'image' | 'video' | 'audio' | 'other';

export type UploadFileProps = {
  file: File;
  ownerID: string;
  accountID: string;
  path: string;
};
export type GetFilesProps = {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
};
