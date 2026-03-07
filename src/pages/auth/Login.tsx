import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';
import { authService } from '@/modules/auth/authService';
import { useApi } from '@/hooks/useApi';
import { isValidMobile } from '@/utils/validators';

const Login: React.FC = () => {

const [mobile, setMobile] = useState('');
const navigate = useNavigate();

const { request, loading, error } = useApi(authService.requestOtp);

//////////////////////////////////////////////////////
// SEND OTP
//////////////////////////////////////////////////////

const handleSendOTP = async (e: React.FormEvent) => {

e.preventDefault();

if (!isValidMobile(mobile) || loading) return;

try {

  // Send only 10 digit number to backend
  const phoneNumber = mobile;

  await request({
    phoneNumber
  });

  //////////////////////////////////////////////////////
  // Navigate to OTP verification
  //////////////////////////////////////////////////////

  navigate('/verify-otp', {
    state: { phoneNumber }
  });

} catch (err) {

  console.error('OTP request failed:', err);

}

};

const isFormValid = isValidMobile(mobile);

//////////////////////////////////////////////////////
// UI
//////////////////////////////////////////////////////

return (

<div className="w-full max-w-md mx-auto">

  <div className="bg-white rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">

    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />

    <div className="mb-10 text-center">

      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Smartphone className="w-8 h-8 text-blue-600" />
      </div>

      <h2 className="text-3xl font-[950] text-slate-900 tracking-tight">
        Enter Mobile
      </h2>

      <p className="text-slate-500 mt-2 font-medium">
        We'll send a 6-digit secure code
      </p>

    </div>

    <form onSubmit={handleSendOTP} className="space-y-8">

      <div className="space-y-3">

        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
          Phone Number
        </label>

        <div
          className={`
          relative flex items-center h-16 rounded-2xl border-2 transition-all duration-300
          ${
            mobile.length > 0
              ? isFormValid
                ? 'border-blue-600 bg-blue-50/10'
                : 'border-red-200 bg-red-50/10'
              : 'border-slate-100 bg-slate-50/50'
          }
          focus-within:border-blue-600 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-blue-50
        `}
        >

          <div className="pl-5 pr-3 border-r border-slate-200 flex items-center gap-2">
            <span className="text-lg font-black text-slate-900">🇮🇳</span>
            <span className="text-base font-bold text-slate-400">+91</span>
          </div>

          <input
            type="tel"
            value={mobile}
            autoFocus
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))
            }
            placeholder="00000 00000"
            className="w-full h-full bg-transparent px-4 text-xl font-black tracking-[0.1em] text-slate-900 placeholder:text-slate-300 focus:outline-none"
          />

          {isFormValid && (
            <div className="pr-5 animate-in zoom-in duration-300">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

        </div>

        {error && (
          <p className="text-xs font-bold text-red-500 ml-1 animate-in slide-in-from-top-1">
            {error}
          </p>
        )}

      </div>

      <Button
        type="submit"
        fullWidth
        size="lg"
        className="h-16 shadow-2xl group"
        isLoading={loading}
        disabled={!isFormValid || loading}
      >
        Get Security Code
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>

    </form>

    <div className="mt-10 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 border border-slate-100">
      <ShieldCheck className="w-4 h-4 text-slate-400" />
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        AES-256 Encrypted Session
      </span>
    </div>

  </div>

  <p className="mt-8 text-center text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-tighter">
    By continuing, you agree to KaagazSeva's <br />
    <span className="text-slate-900 cursor-pointer hover:text-blue-600 transition-colors">
      Terms of Service
    </span>{' '}
    &{' '}
    <span className="text-slate-900 cursor-pointer hover:text-blue-600 transition-colors">
      Privacy Policy
    </span>
  </p>

</div>

);

};

export default Login;