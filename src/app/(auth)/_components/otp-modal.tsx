'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

import toast from 'react-hot-toast';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {InputOTP, InputOTPGroup, InputOTPSlot} from '@/components/ui/input-otp';
import {sendEmailOTP, verifySecret} from '@/lib/actions/user-actions';

interface OTPModalProps {
  accountID: string;
  email: string;
}

const OTPModal = ({accountID, email}: OTPModalProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionID = await verifySecret({accountID, otp});

      if (sessionID) router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to verify OTP');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    await sendEmailOTP({email});
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='alert-dialog'>
        <DialogHeader>
          <DialogTitle className='h2 text-center'>Enter OTP</DialogTitle>
          <DialogDescription className='body-2 text-center text-gray-400'>
            We&apos;ve sent a code to
            <span className='text-brand ml-1'>{email}</span>
          </DialogDescription>
        </DialogHeader>

        <InputOTP maxLength={6} value={otp} onChange={setOTP}>
          <InputOTPGroup className='otp-group'>
            <InputOTPSlot index={0} className='otp-slot' />
            <InputOTPSlot index={1} className='otp-slot' />
            <InputOTPSlot index={2} className='otp-slot' />
            <InputOTPSlot index={3} className='otp-slot' />
            <InputOTPSlot index={4} className='otp-slot' />
            <InputOTPSlot index={5} className='otp-slot' />
          </InputOTPGroup>
        </InputOTP>

        <DialogFooter className='w-full gap-4'>
          <Button
            type='button'
            onClick={handleSubmit}
            className='button submit-button h-12'>
            Submit
            {isLoading && (
              <Image
                src='/icons/loader.svg'
                alt='loader'
                width={24}
                height={24}
                className='ml-2 animate-spin'
              />
            )}
          </Button>

          <div className='body-2 flex flex-wrap items-center justify-center gap-1 text-center text-gray-400'>
            <span className='text-nowrap'>Didn&apos;t get a code?</span>
            <Button
              type='button'
              variant='link'
              className='text-brand cursor-pointer p-0'
              onClick={handleResendOtp}>
              Click to resend
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OTPModal;
