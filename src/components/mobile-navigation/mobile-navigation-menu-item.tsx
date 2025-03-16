import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {cn} from '@/lib/utils';

interface MobileNavigationMenuItemProps {
  url: string;
  name: string;
  icon: string;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNavigationMenuItem = ({
  url,
  name,
  icon,
  setIsOpen
}: MobileNavigationMenuItemProps) => {
  const pathname = usePathname();
  return (
    <li>
      <Link
        onClick={() => setIsOpen(false)}
        className={cn(
          'mobile-navigation-link h5',
          pathname === url && 'mobile-navigation-link-active'
        )}
        href={url}>
        <Image
          src={icon}
          alt={name}
          width={24}
          height={24}
          className={cn(
            'navigation-icon',
            pathname === url && 'navigation-icon-active'
          )}
        />
        <p>{name}</p>
      </Link>
    </li>
  );
};

export default MobileNavigationMenuItem;
