import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

import {
  audioExtensions,
  documentExtensions,
  imageExtensions,
  videoExtensions
} from '@/constants';
import {FileType} from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const getFileType = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  if (!extension) return {type: 'other', extension: ''};

  if (documentExtensions.includes(extension))
    return {type: 'document', extension};
  if (imageExtensions.includes(extension)) return {type: 'image', extension};
  if (videoExtensions.includes(extension)) return {type: 'video', extension};
  if (audioExtensions.includes(extension)) return {type: 'audio', extension};

  return {type: 'other', extension};
};

export const getFileIcon = (
  extension: string | undefined,
  type: FileType | string
) => {
  switch (extension) {
    // Document
    case 'pdf':
      return '/icons/file-pdf.svg';
    case 'doc':
      return '/icons/file-doc.svg';
    case 'docx':
      return '/icons/file-docx.svg';
    case 'csv':
      return '/icons/file-csv.svg';
    case 'txt':
      return '/icons/file-txt.svg';
    case 'xls':
    case 'xlsx':
      return '/icons/file-document.svg';
    // Image
    case 'svg':
      return '/icons/file-image.svg';

    // Video
    case 'mkv':
    case 'mov':
    case 'avi':
    case 'wmv':
    case 'mp4':
    case 'flv':
    case 'webm':
    case 'm4v':
    case '3gp':
      return '/icons/file-video.svg';

    // Audio
    case 'mp3':
    case 'mpeg':
    case 'wav':
    case 'aac':
    case 'flac':
    case 'ogg':
    case 'wma':
    case 'm4a':
    case 'aiff':
    case 'alac':
      return '/icons/file-audio.svg';

    default:
      switch (type) {
        case 'image':
          return '/icons/file-image.svg';
        case 'document':
          return '/icons/file-document.svg';
        case 'video':
          return '/icons/file-video.svg';
        case 'audio':
          return '/icons/file-audio.svg';
        default:
          return '/icons/file-other.svg';
      }
  }
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return '—';

  const date = new Date(isoString);

  // Adjust for 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time and date parts
  const time = `${hours}:${minutes.toString().padStart(2, '0')}${period}`;
  const day = date.getDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

// UTILS TO WORK WITH APPWRITE STORAGE
export const constructFileUrl = (bucketFileID: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileID}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

export const constructDownloadUrl = (bucketFileID: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileID}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};
