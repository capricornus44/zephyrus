'use client';

import Image from 'next/image';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

import {Models} from 'node-appwrite';

import {useDebounce} from '@/hooks/useDebounce';
import {getFiles} from '@/lib/actions/file-actions';

import DateTime from '../date-time';
import {Input} from '../ui/input';
import Thumbnail from './thumbnail';

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Models.Document[]>([]);
  const debouncedSearch = useDebounce(search);

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedSearch.length === 0) {
        setSearchResults([]);
        setIsOpen(false);
        return router.push(path.replace(searchParams.toString(), ''));
      }

      const files = await getFiles({types: [], searchText: debouncedSearch});
      setSearchResults(files.documents);
      setIsOpen(true);
    };

    fetchFiles();
  }, [debouncedSearch, path, router, searchParams]);

  useEffect(() => {
    if (!searchQuery) {
      setSearch('');
    }
  }, [searchQuery]);

  const onClickItem = (file: Models.Document) => {
    setIsOpen(false);
    setSearchResults([]);

    router.push(
      `/${file.type === 'video' || file.type === 'audio' ? 'media' : file.type + 's'}?search=${search}`
    );
  };

  return (
    <div className='search'>
      <div className='search-input-container'>
        <Image
          src='/icons/search.svg'
          alt='Search icon'
          width={24}
          height={24}
        />

        <Input
          value={search}
          placeholder='Search...'
          className='search-input body-2 placeholder:body-1'
          onChange={e => setSearch(e.target.value)}
        />

        {isOpen && (
          <ul className='search-result'>
            {searchResults.length > 0 ? (
              searchResults.map(file => (
                <li
                  className='flex items-center justify-between'
                  key={file.$id}
                  onClick={() => onClickItem(file)}>
                  <div className='flex cursor-pointer items-center gap-4'>
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className='size-9 min-w-9'
                    />
                    <p className='subtitle-2 line-clamp-1 text-gray-400'>
                      {file.name}
                    </p>
                  </div>

                  <DateTime
                    date={file.$createdAt}
                    className='caption line-clamp-1 text-gray-300'
                  />
                </li>
              ))
            ) : (
              <p className='empty-result body-2'>No files found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
