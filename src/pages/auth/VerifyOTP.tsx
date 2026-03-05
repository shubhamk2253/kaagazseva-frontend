import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authService } from '@/modules/auth/authService';
import { useApi } from '@/hooks/useApi';

interface LocationState {
  phoneNumber?: string;
}

interface VerifyResponse {
  accessToken: string;
  user: {
    id: string;
    phoneNumber: string;
    name?: string;
    role:
      | 'customer'
      | 'agent'
      | 'district_admin'
      | 'state_admin'
      | 'founder';
    createdAt: string;
  };
}

const VerifyOTP: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;
  const phoneNumber = state?.phoneNumber;

  const [otp, setOtp] = useState('');

  const { request, loading, error } =
    useApi<VerifyResponse, [{ mobile: string; otp: string }]>(
      authService.verifyOtp
    );

  //////////////////////////////////////////////////////
  // REDIRECT IF NO PHONE
  //////////////////////////////////////////////////////

  useEffect(() => {

    if (!phoneNumber) {
      navigate('/login', { replace: true });
    }

  }, [phoneNumber, navigate]);

  //////////////////////////////////////////////////////
  // VERIFY OTP
  //////////////////////////////////////////////////////

  const handleVerify = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!phoneNumber || otp.length !== 6) return;

    try {

      const response = await request({
        mobile: phoneNumber,
        otp,
      });

      const rolePaths = {
        customer: '/customer',
        agent: '/agent',
        district_admin: '/district-admin',
        state_admin: '/state-admin',
        founder: '/founder',
      };

      navigate(rolePaths[response.user.role], {
        replace: true,
      });

    } catch (err) {

      console.error('Verification failed:', err);

    }

  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-50 max-w-md mx-auto">

      <div className="mb-8">

        <button
          onClick={() => navigate('/login')}
          className="text-slate-400 hover:text-blue-600 text-sm font-medium mb-4 flex items-center gap-1 transition-colors"
        >
          ← Change Number
        </button>

        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Verify Identity
        </h2>

        <p className="text-slate-500 mt-2">
          We've sent a code to{' '}
          <span className="font-bold text-slate-900">
            +91 {phoneNumber ?? ''}
          </span>
        </p>

      </div>

      <form onSubmit={handleVerify} className="space-y-6">

        <Input
          label="6-Digit OTP"
          type="text"
          placeholder="000000"
          maxLength={6}
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
          }
          error={error ?? undefined}
          disabled={loading}
          className="text-center text-2xl tracking-[0.5em] font-mono font-bold"
          autoFocus
        />

        <Button
          fullWidth
          isLoading={loading}
          disabled={otp.length !== 6 || loading}
        >
          Verify & Log In
        </Button>

      </form>

      <div className="mt-8 text-center pt-6 border-t border-slate-50">

        <p className="text-sm text-slate-500">
          Didn’t receive the code?{' '}
          <button
            type="button"
            className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
          >
            Resend
          </button>
        </p>

      </div>

    </div>

  );

};

export default VerifyOTP;