import Image from 'next/image';
import {ReactNode} from 'react';

const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <section className='flex min-h-screen'>
      <div className='bg-brand hidden w-1/2 items-center justify-center p-10 lg:flex xl:w-2/5'>
        <div className='flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12'>
          <div className='flex items-center gap-5'>
            <Image
              src='/icons/logo.svg'
              alt='logo'
              width={82}
              height={82}
              className='h-auto'
            />

            <span className='h2 font-dynapuff text-white'>Zephyrus</span>
          </div>

          <div className='space-y-5 text-white'>
            <h1 className='h1 text-pretty'>Manage your files the best way</h1>
            <p className='body-1'>
              Awesome, we&apos;ve created the perfect place for you to store all
              your documents.
            </p>
          </div>
          <Image
            src='/icons/files.svg'
            alt='Files'
            width={342}
            height={342}
            className='mx-auto transition-all hover:scale-105 hover:rotate-2'
          />
        </div>
      </div>

      <div className='flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0'>
        <div className='mb-16 flex items-center gap-5 lg:hidden'>
          <Image
            src='/icons/logo-brand.svg'
            alt='logo'
            width={82}
            height={82}
          />

          <span className='h2 font-dynapuff text-gray-500'>Zephyrus</span>
        </div>

        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
