import {routes} from '@/constants';

import MobileNavigationMenuItem from './mobile-navigation-menu-item';

interface MobileNavigationMenuProps {
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavigationMenu = ({setIsOpen}: MobileNavigationMenuProps) => {
  return (
    <nav className='mobile-navigation'>
      <ul className='mobile-navigation-list'>
        {routes.map(({url, name, icon}) => (
          <MobileNavigationMenuItem
            key={name}
            url={url}
            name={name}
            icon={icon}
            setIsOpen={setIsOpen}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavigationMenu;
