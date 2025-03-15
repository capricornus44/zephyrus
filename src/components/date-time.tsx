import React from 'react';

import {cn, formatDateTime} from '@/lib/utils';

export const DateTime = ({
  date,
  className
}: {
  date: string;
  className?: string;
}) => {
  return (
    <p className={cn('body-1 text-gray-300', className)}>
      {formatDateTime(date)}
    </p>
  );
};
export default DateTime;
