/**
 * KAAGAZSEVA - National Infrastructure Environment Config
 * Ensures the app knows exactly which "World" it's talking to.
 */

const getEnv = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`❌ Missing Environment Variable: ${key}. Check your .env file.`);
  }
  return value || (defaultValue as string);
};

export const CONFIG = {
  // Logic: 1. Process Env -> 2. Local Proxy -> 3. Hardcoded Fallback
  API_BASE_URL: getEnv('VITE_API_BASE_URL', '/api'), 
  APP_NAME: 'KaagazSeva',
  VERSION: '1.0.0',
  ENV: import.meta.env.MODE, // 'development' or 'production'
  IS_PROD: import.meta.env.PROD,
  SUPPORT_EMAIL: 'support@kaagazseva.com',
};