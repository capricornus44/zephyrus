'use client';

import Image from 'next/image';
import {useState} from 'react';

import {Separator} from '../ui/separator';
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from '../ui/sheet';
import MobileNavigationFooter from './mobile-navigation-footer';
import MobileNavigationHeader from './mobile-navigation-header';
import MobileNavigationMenu from './mobile-navigation-menu';

interface MobileNavigationProps {
  fullName: string;
  avatar: string;
  email: string;
  $id: string;
  accountID: string;
}

const MobileNavigation = ({
  fullName,
  avatar,
  email,
  $id: ownerID,
  accountID
}: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='mobile-header'>
      <Image
        src='/icons/logo-full-brand.svg'
        alt='logo'
        width={120}
        height={52}
        className='h-auto'
      />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Image src='/icons/menu.svg' alt='Menu icon' width={30} height={30} />
        </SheetTrigger>
        <SheetContent className='h-screen px-3 pt-0'>
          <SheetTitle>
            <MobileNavigationHeader
              avatar={avatar}
              email={email}
              fullName={fullName}
            />
            <Separator className='mb-4 bg-gray-300/20' />
          </SheetTitle>

          <MobileNavigationMenu setIsOpen={setIsOpen} />

          <Separator className='my-5 bg-gray-300/20' />
          <MobileNavigationFooter ownerID={ownerID} accountID={accountID} />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
