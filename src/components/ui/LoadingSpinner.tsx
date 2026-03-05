import React from 'react';

/**
 * KAAGAZSEVA - Loading Spinner
 * Simple reusable loading component
 */

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-sm text-slate-500 font-medium">
          Loading...
        </p>

      </div>

    </div>
  );
};