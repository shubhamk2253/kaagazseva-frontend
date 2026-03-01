import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authService } from '@/modules/auth/authService';
import { useApi } from '@/hooks/useApi';

interface LocationState {
  mobile?: string;
}

export const VerifyOTP: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;
  const mobile = state?.mobile;

  const [otp, setOtp] = useState('');

  const { request, loading, error } =
    useApi<
      { user: { role: 'admin' | 'agent' | 'customer' } },
      [{ mobile: string; otp: string }]
    >(authService.verifyOtp);

  useEffect(() => {
    if (!mobile) {
      navigate('/login', { replace: true });
    }
  }, [mobile, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || otp.length < 4) return;

    try {
      const response = await request({ mobile, otp });

      const rolePaths = {
        admin: '/admin',
        agent: '/agent',
        customer: '/customer',
      };

      navigate(rolePaths[response.user.role] || '/customer', {
        replace: true,
      });
    } catch (err) {
      console.error('Verification failed:', err);
    }
  };

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
          We&apos;ve sent a code to{' '}
          <span className="font-bold text-slate-900">
            +91 {mobile ?? ''}
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
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          error={error ?? undefined}
          disabled={loading}
          className="text-center text-2xl tracking-[0.5em] font-mono font-bold"
          autoFocus
        />

        <Button
          fullWidth
          isLoading={loading}
          disabled={otp.length < 4 || loading}
        >
          Verify & Log In
        </Button>
      </form>

      <div className="mt-8 text-center pt-6 border-t border-slate-50">
        <p className="text-sm text-slate-500">
          Didn&apos;t receive the code?{' '}
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