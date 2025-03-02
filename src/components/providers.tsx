'use client';

import {ReactNode} from 'react';

import {Toaster} from 'react-hot-toast';

const Providers = ({children}: {children: ReactNode}) => {
  return (
    <>
      <Toaster position='top-right' />
      {children}
    </>
  );
};

export default Providers;
