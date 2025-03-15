'use client';

import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useCallback, useState} from 'react';

import {useDropzone} from 'react-dropzone';
import toast from 'react-hot-toast';

import {MAX_FILE_SIZE} from '@/constants';
import {uploadFile} from '@/lib/actions/file-actions';
import {cn, convertFileToUrl, getFileType} from '@/lib/utils';

import {Button} from '../ui/button';
import Thumbnail from './thumbnail';

interface FileUploaderProps {
  ownerID: string;
  accountID: string;
  className?: string;
}

const FileUploader = ({ownerID, accountID, className}: FileUploaderProps) => {
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async file => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles(prevFiles => prevFiles.filter(f => f.name !== file.name));
          return toast.error('Max file size is 50MB');
        }

        return uploadFile({file, ownerID, accountID, path}).then(
          uploadedFile => {
            if (uploadedFile) {
              setFiles(prevFiles =>
                prevFiles.filter(f => f.name !== file.name)
              );
            }
          }
        );
      });

      await Promise.all(uploadPromises);
    },
    [accountID, ownerID, path]
  );

  const onRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <div {...getRootProps()} className='cursor-pointer'>
      <input {...getInputProps()} />

      <Button type='button' className={cn('upload-button button', className)}>
        <Image
          src='/icons/upload.svg'
          alt='Upload icon'
          width={24}
          height={24}
        />
        <p>Upload</p>
      </Button>

      {files.length > 0 && (
        <ul className='uploader-preview-list'>
          <h4 className='h4 text-gray-400'>Uploading...</h4>

          {files.map((file, index) => {
            const {type, extension} = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className='uploader-preview-item'>
                <div className='flex items-center gap-3'>
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className='preview-item-name subtitle-2'>
                    {file.name}
                    <Image
                      src='/icons/file-loader.gif'
                      width={80}
                      height={26}
                      alt='Loader'
                    />
                  </div>
                </div>

                <Image
                  src='/icons/remove.svg'
                  width={24}
                  height={24}
                  alt='Remove icon'
                  onClick={e => onRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
