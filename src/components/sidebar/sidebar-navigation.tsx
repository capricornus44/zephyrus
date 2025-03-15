import {routes} from '@/constants';

import SidebarNavigationItem from './sidebar-navigation-item';

const SidebarNavigation = () => {
  return (
    <nav className='sidebar-navigation'>
      <ul className='flex flex-1 flex-col gap-6'>
        {routes.map(route => (
          <SidebarNavigationItem key={route.name} {...route} />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
