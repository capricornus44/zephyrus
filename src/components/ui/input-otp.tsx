'use client';

import * as React from 'react';

import {OTPInput, OTPInputContext} from 'input-otp';
import {MinusIcon} from 'lucide-react';

import {cn} from '@/lib/utils';

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot='input-otp'
      containerClassName={cn(
        'flex items-center gap-2 has-disabled:opacity-50',
        containerClassName
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  );
}

function InputOTPGroup({className, ...props}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='input-otp-group'
      className={cn('flex items-center', className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const {char, hasFakeCaret, isActive} = inputOTPContext.slots[index];

  return (
    <div
      data-slot='input-otp-slot'
      data-active={isActive}
      className={cn(
        'data-[active=true]:border-brand data-[active=true]:ring-brand data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive relative flex h-9 w-9 items-center justify-center rounded-md border-2 border-gray-200 text-2xl shadow-xs transition-all outline-none data-[active=true]:z-10 data-[active=true]:ring-[3px] md:text-5xl',
        className
      )}
      {...props}>
      {char}
      {hasFakeCaret && (
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
          <div className='animate-caret-blink bg-foreground h-4 w-px duration-1000' />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({...props}: React.ComponentProps<'div'>) {
  return (
    <div data-slot='input-otp-separator' role='separator' {...props}>
      <MinusIcon />
    </div>
  );
}

export {InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator};
