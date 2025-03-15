import Image from 'next/image';

interface SidebarUserInfoProps {
  fullName: string;
  avatar: string;
  email: string;
}

const SidebarUserInfo = ({fullName, avatar, email}: SidebarUserInfoProps) => {
  return (
    <div className='sidebar-user-info'>
      <Image
        src={avatar}
        alt='Avatar'
        width={44}
        height={44}
        className='sidebar-user-avatar'
      />
      <div className='hidden lg:block'>
        <p className='subtitle-2 capitalize'>{fullName}</p>
        <p className='caption text-gray-300'>{email}</p>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
