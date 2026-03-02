import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${className}`}
    >
      {/* Header */}
      {title && (
        <div className="px-8 py-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>
      )}

      {/* Body */}
      <div className="px-8 py-8">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-8 py-6 border-t border-slate-200 bg-slate-50/50">
          {footer}
        </div>
      )}
    </div>
  );
};