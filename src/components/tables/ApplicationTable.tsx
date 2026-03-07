import React from 'react';
import { Link } from 'react-router-dom';
import type { Application } from '@/modules/application/types';

interface Props {
  data: Application[];
}

export const ApplicationTable: React.FC<Props> = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-slate-500 py-6 text-center">
        No applications found.
      </p>
    );
  }

  return (

    <div className="overflow-x-auto">

      <table className="w-full text-sm">

        <thead>
          <tr className="text-left border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">

            <th className="py-3">Service</th>
            <th>Status</th>
            <th>District</th>
            <th>Amount</th>
            <th>Date</th>
            <th></th>

          </tr>
        </thead>

        <tbody>

          {data.map((app) => (

            <tr
              key={app.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >

              <td className="py-4 font-semibold text-slate-800">
                {app.serviceType}
              </td>

              <td>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  {app.status.replace('_', ' ')}
                </span>
              </td>

              <td className="text-slate-600">
                {app.district}
              </td>

              <td className="font-semibold">
                ₹{app.totalAmount}
              </td>

              <td className="text-slate-500">
                {new Date(app.createdAt).toLocaleDateString()}
              </td>

              <td>

                <Link
                  to={`/customer/application/${app.id}`}
                  className="text-blue-600 font-semibold hover:text-blue-800"
                >
                  View
                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};