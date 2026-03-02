import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'glass';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:pointer-events-none overflow-hidden select-none";

  const sizeStyles: Record<Size, string> = {
    sm: "px-4 py-2 text-xs rounded-xl",
    md: "px-6 py-3 text-sm rounded-2xl",
    lg: "px-8 py-4 text-base rounded-[20px]",
    xl: "px-10 py-5 text-lg rounded-[24px]", // Added for Hero sections
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-slate-950 text-white hover:bg-blue-700 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] hover:shadow-blue-200",

    secondary:
      "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 shadow-sm",

    outline:
      "border-2 border-blue-700 text-blue-700 hover:bg-blue-50/50 backdrop-blur-sm",

    danger:
      "bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white shadow-sm",

    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100",
      
    glass:
      "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Premium Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-inherit flex items-center justify-center z-10">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}

      <div className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {leftIcon && <span className="transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
      </div>
    </button>
  );
};