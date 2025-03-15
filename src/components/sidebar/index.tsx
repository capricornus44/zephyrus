import Image from 'next/image';

import SidebarLogo from './sidebar-logo';
import SidebarNavigation from './sidebar-navigation';
import SidebarUserInfo from './sidebar-user-info';

interface SidebarProps {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({fullName, avatar, email}: SidebarProps) => {
  return (
    <aside className='sidebar'>
      <SidebarLogo />
      <SidebarNavigation />
      <Image
        src='/icons/files.svg'
        alt='logo'
        width={506}
        height={418}
        className='w-full'
      />
      <SidebarUserInfo avatar={avatar} fullName={fullName} email={email} />
    </aside>
  );
};

export default Sidebar;
