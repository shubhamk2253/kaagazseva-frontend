import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authService } from '@/modules/auth/authService'; 
import { useApi } from '@/hooks/useApi';
import { isValidMobile } from '@/utils/validators';

export const Login: React.FC = () => {
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  // 100/100 Discipline: Use the Nervous System hook
  // This automatically handles loading, error, and memory leaks
  const { request, loading, error } = useApi(authService.requestOtp);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidMobile(mobile)) {
      // Local validation check before hitting the network
      return; 
    }
    
    try {
      // Calls Step 1: Request OTP
      await request({ mobile });
      
      // If successful, move to verification
      navigate('/verify-otp', { state: { mobile } });
    } catch (err) {
      // useApi already updated the 'error' state, 
      // so we don't need to do anything here unless we want a toast.
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-50 max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sign In</h2>
        <p className="text-slate-500 mt-2">Access the National Service Marketplace</p>
      </div>
      
      <form onSubmit={handleSendOTP} className="space-y-6">
        <Input 
          label="Mobile Number"
          type="tel"
          placeholder="e.g. 9876543210"
          value={mobile}
          // Strict input formatting
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
          error={error || (mobile.length > 0 && !isValidMobile(mobile) ? 'Invalid format' : '')}
          disabled={loading}
          autoFocus
        />

        <Button 
          type="submit"
          fullWidth 
          isLoading={loading}
          disabled={!isValidMobile(mobile) || loading}
        >
          {loading ? 'Sending OTP...' : 'Continue'}
        </Button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-center text-xs text-slate-400 leading-relaxed">
          By continuing, you agree to KaagazSeva’s <br/>
          <span className="underline cursor-pointer hover:text-slate-600">Terms of Service</span> and 
          <span className="underline cursor-pointer hover:text-slate-600 ml-1">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};