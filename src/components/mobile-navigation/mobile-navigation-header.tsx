import Image from 'next/image';

interface MobileNavigationHeaderProps {
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigationHeader = ({
  fullName,
  avatar,
  email
}: MobileNavigationHeaderProps) => {
  return (
    <div className='menu-user'>
      <Image
        src={avatar}
        alt='avatar'
        width={44}
        height={44}
        className='menu-user-avatar'
      />
      <div>
        <p className='subtitle-2 capitalize'>{fullName}</p>
        <p className='caption text-gray-300'>{email}</p>
      </div>
    </div>
  );
};

export default MobileNavigationHeader;
