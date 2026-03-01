/**
 * Validates 10-digit Indian Mobile Numbers.
 */
export const isValidMobile = (mobile: string): boolean => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile);
};

/**
 * Validates Email addresses.
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Basic OTP length check.
 */
export const isValidOTP = (otp: string): boolean => {
  return otp.length === 6 && /^\d+$/.test(otp);
};