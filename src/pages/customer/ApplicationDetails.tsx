import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from '@/components/ui/Card';
import { ApplicationTimeline } from '@/components/application/ApplicationTimeline';

import { applicationService } from '@/modules/application/applicationService';
import { useApi } from '@/hooks/useApi';

import { formatCurrency, formatDate } from '@/utils/formatters';
import type { Application } from '@/modules/application/types';

/**
 * KAAGAZSEVA
 * Customer Application Details Page
 */

const ApplicationDetails: React.FC = () => {

  //////////////////////////////////////////////////////
  // ROUTE PARAM
  //////////////////////////////////////////////////////

  const { id } = useParams<{ id: string }>();

  //////////////////////////////////////////////////////
  // API
  //////////////////////////////////////////////////////

  const {
    data: app,
    request: fetchApplication,
  } = useApi<Application, [string]>(
    applicationService.getById
  );

  //////////////////////////////////////////////////////
  // LOAD APPLICATION
  //////////////////////////////////////////////////////

  useEffect(() => {

    if (id) {
      fetchApplication(id);
    }

  }, [id, fetchApplication]);

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (!app) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading application details...
      </div>
    );
  }

  //////////////////////////////////////////////////////
  // PAGE
  //////////////////////////////////////////////////////

  return (

    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Application Details
        </h1>

        <p className="text-slate-500 mt-2">
          Track your service request progress.
        </p>

      </div>

      {/* TIMELINE */}

      <Card title="Application Progress">

        <ApplicationTimeline status={app.status} />

      </Card>

      {/* SERVICE INFORMATION */}

      <Card title="Service Information">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

          <p>
            <b>Service Type:</b> {app.serviceType}
          </p>

          <p>
            <b>Status:</b> {app.status.replaceAll('_', ' ')}
          </p>

          <p>
            <b>State:</b> {app.state}
          </p>

          <p>
            <b>District:</b> {app.district}
          </p>

          <p>
            <b>Created At:</b> {formatDate(app.createdAt)}
          </p>

          <p>
            <b>Mode:</b> {app.mode}
          </p>

        </div>

      </Card>

      {/* AGENT INFORMATION */}

      <Card title="Assigned Agent">

        {app.agent ? (

          <div className="space-y-2 text-sm">

            <p>
              <b>Name:</b> {app.agent.name}
            </p>

            <p>
              <b>Phone:</b> {app.agent.phoneNumber}
            </p>

          </div>

        ) : (

          <p className="text-sm text-slate-500">
            No agent assigned yet.
          </p>

        )}

      </Card>

      {/* PAYMENT BREAKDOWN */}

      <Card title="Payment Details">

        <div className="space-y-3 text-sm">

          <div className="flex justify-between">
            <span>Government Fee</span>
            <span>{formatCurrency(app.govtFee)}</span>
          </div>

          <div className="flex justify-between">
            <span>Service Fee</span>
            <span>{formatCurrency(app.serviceFee)}</span>
          </div>

          <div className="flex justify-between">
            <span>Platform Commission</span>
            <span>{formatCurrency(app.platformCommission)}</span>
          </div>

          <div className="flex justify-between">
            <span>Agent Commission</span>
            <span>{formatCurrency(app.agentCommission)}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>{formatCurrency(app.deliveryFee)}</span>
          </div>

          <div className="flex justify-between font-bold border-t pt-3 mt-3 text-base">

            <span>Total Amount</span>

            <span>{formatCurrency(app.totalAmount)}</span>

          </div>

        </div>

      </Card>

      {/* DOCUMENTS */}

      <Card title="Uploaded Documents">

        {app.documents && Object.keys(app.documents).length > 0 ? (

          <ul className="list-disc pl-6 text-sm space-y-1">

            {Object.keys(app.documents).map((doc, index) => (

              <li key={index}>
                {doc}
              </li>

            ))}

          </ul>

        ) : (

          <p className="text-sm text-slate-500">
            No documents uploaded.
          </p>

        )}

      </Card>

    </div>

  );

};

export default ApplicationDetails;