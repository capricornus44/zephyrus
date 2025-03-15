import {redirect} from 'next/navigation';
import {ReactNode} from 'react';

import Header from '@/components/header';
import MobileNavigation from '@/components/mobile-navigation';
import Sidebar from '@/components/sidebar';
import {getCurrentUser} from '@/lib/actions/user-actions';

export const dynamic = 'force-dynamic';

const MainLayout = async ({children}: {children: ReactNode}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect('/login');

  return (
    <div className='flex h-screen'>
      <Sidebar {...currentUser} />

      <main className='flex h-full flex-1 flex-col'>
        <MobileNavigation {...currentUser} />
        <Header userID={currentUser.$id} accountID={currentUser.accountID} />

        <section className='main-content flex-1 rounded-4xl bg-gray-100 p-5'>
          {children}
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
