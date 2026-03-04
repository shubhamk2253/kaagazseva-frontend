import React from 'react';
import type { ApplicationStatus } from '@/modules/application/types';

/**
 * KAAGAZSEVA
 * Application Progress Timeline
 */

interface Props {
  status: ApplicationStatus;
}

/**
 * Ordered lifecycle steps
 */
const steps: ApplicationStatus[] = [
  'DRAFT',
  'PENDING_PAYMENT',
  'SUBMITTED',
  'ASSIGNED',
  'UNDER_REVIEW',
  'DOCUMENT_REQUIRED',
  'COMPLETED',
];

const getStepLabel = (step: ApplicationStatus) => {
  return step.replaceAll('_', ' ');
};

export const ApplicationTimeline: React.FC<Props> = ({ status }) => {

  //////////////////////////////////////////////////////
  // TERMINAL STATES
  //////////////////////////////////////////////////////

  if (status === 'REJECTED' || status === 'CANCELLED') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-semibold">
        Application {status.toLowerCase()}.
      </div>
    );
  }

  //////////////////////////////////////////////////////
  // CURRENT STEP INDEX
  //////////////////////////////////////////////////////

  const currentIndex = steps.indexOf(status);

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <div className="flex items-center justify-between w-full">

      {steps.map((step, index) => {

        const completed = index < currentIndex;
        const active = index === currentIndex;

        return (

          <div
            key={step}
            className="flex flex-col items-center flex-1 relative"
          >

            {/* LINE */}

            {index !== steps.length - 1 && (

              <div
                className={`absolute top-4 left-1/2 w-full h-[2px]
                ${index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'}`}
              />

            )}

            {/* STEP CIRCLE */}

            <div
              className={`z-10 w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold
              ${
                completed
                  ? 'bg-blue-600 text-white'
                  : active
                  ? 'bg-blue-100 text-blue-700 border border-blue-600'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>

            {/* LABEL */}

            <p
              className={`mt-2 text-xs text-center max-w-[80px]
              ${
                active
                  ? 'text-blue-700 font-semibold'
                  : completed
                  ? 'text-slate-700'
                  : 'text-slate-400'
              }`}
            >
              {getStepLabel(step)}
            </p>

          </div>

        );

      })}

    </div>

  );

};