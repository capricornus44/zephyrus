import Image from 'next/image';
import Link from 'next/link';

const SidebarLogo = () => {
  return (
    <>
      <Link href='/'>
        <Image
          src='/icons/logo-full-brand.svg'
          alt='logo'
          width={160}
          height={50}
          className='hidden h-auto lg:block'
        />

        <Image
          src='/icons/logo-brand.svg'
          alt='logo'
          width={52}
          height={52}
          className='lg:hidden'
        />
      </Link>
    </>
  );
};

export default SidebarLogo;
