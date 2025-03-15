import Image from 'next/image';

import {logout} from '@/lib/actions/user-actions';

import {Button} from '../ui/button';
import FileUploader from './file-uploader';
import Search from './search';

interface HeaderProps {
  userID: string;
  accountID: string;
}

const Header = ({userID, accountID}: HeaderProps) => {
  return (
    <header className='header'>
      <Search />

      <div className='header-container'>
        <FileUploader ownerID={userID} accountID={accountID} />
        <form action={logout}>
          <Button type='submit' className='logout-button'>
            <Image
              src='/icons/logout.svg'
              alt='Logout icon'
              width={24}
              height={24}
              className='w-6'
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
