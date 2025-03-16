import Image from 'next/image';

import {logout} from '@/lib/actions/user-actions';

import FileUploader from '../header/file-uploader';
import {Button} from '../ui/button';

interface MobileNavigationFooterProps {
  ownerID: string;
  accountID: string;
}

const MobileNavigationFooter = ({
  ownerID,
  accountID
}: MobileNavigationFooterProps) => {
  return (
    <div className='mobile-navigation-actions'>
      <FileUploader ownerID={ownerID} accountID={accountID} />
      <Button type='submit' className='mobile-logout-button' onClick={logout}>
        <Image
          src='/icons/logout.svg'
          alt='Logout icon'
          width={24}
          height={24}
        />
        <p>Logout</p>
      </Button>
    </div>
  );
};

export default MobileNavigationFooter;
