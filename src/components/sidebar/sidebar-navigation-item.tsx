'use client';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {cn} from '@/lib/utils';

const SidebarNavigationItem = ({
  icon,
  name,
  url
}: {
  icon: string;
  name: string;
  url: string;
}) => {
  const pathname = usePathname();

  return (
    <li className='lg:w-full'>
      <Link
        href={url}
        className={cn(
          'sidebar-link h5',
          pathname === url && 'sidebar-link-active'
        )}>
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
        <p className='hidden lg:block'>{name}</p>
      </Link>
    </li>
  );
};

export default SidebarNavigationItem;
