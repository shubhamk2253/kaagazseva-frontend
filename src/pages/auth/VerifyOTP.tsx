import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/modules/auth/authStore';
import { authService } from '@/modules/auth/authService';
import type { UserRole } from '@/modules/auth/types';

interface LocationState {
  phoneNumber?: string;
}

declare global {
  interface Window {
    confirmationResult: any;
  }
}

interface VerifyResponse {
  accessToken: string;
  user: {
    id: string;
    phoneNumber: string;
    name?: string;
    role: UserRole;
    createdAt: string;
  };
}

const VerifyOTP: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const state = location.state as LocationState | null;
  const phoneNumber = state?.phoneNumber;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      setLoading(true);
      setError(null);

      //////////////////////////////////////////////////////
      // STEP 1 — VERIFY WITH FIREBASE
      //////////////////////////////////////////////////////

      const result = await window.confirmationResult.confirm(otp);

      const firebaseUser = result.user;

      //////////////////////////////////////////////////////
      // STEP 2 — LOGIN BACKEND (CREATE JWT)
      //////////////////////////////////////////////////////

      const response: VerifyResponse =
        await authService.firebaseLogin({
          phoneNumber: firebaseUser.phoneNumber.replace('+91','')
        });

      //////////////////////////////////////////////////////
      // SAVE AUTH SESSION
      //////////////////////////////////////////////////////

      setAuth(
        {
          id: response.user.id,
          phoneNumber: response.user.phoneNumber,
          name: response.user.name ?? undefined,
          role: response.user.role,
          createdAt: response.user.createdAt,
        },
        response.accessToken
      );

      //////////////////////////////////////////////////////
      // ROLE REDIRECT
      //////////////////////////////////////////////////////

      const rolePaths: Record<UserRole, string> = {
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

      console.error('OTP verification failed:', err);
      setError('Invalid OTP');

    } finally {

      setLoading(false);

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

    </div>

  );

};

export default VerifyOTP;