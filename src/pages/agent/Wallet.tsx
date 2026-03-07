import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useApi } from '../../hooks/useApi';
import { walletService } from '../../modules/wallet/walletService';
import { formatCurrency } from '../../utils/formatters';
import type { Wallet } from '../../modules/wallet/types';

const AgentWallet: React.FC = () => {

  const {
    data: wallet,
    loading,
    request: fetchWallet,
  } = useApi<Wallet, []>(
    walletService.getWalletData
  );

  //////////////////////////////////////////////////////
  // LOAD WALLET
  //////////////////////////////////////////////////////

  useEffect(() => {
    fetchWallet();
  }, []);

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading && !wallet) {
    return (
      <div className="text-center py-10 text-slate-500">
        Loading wallet...
      </div>
    );
  }

  const balance = Number(wallet?.balance ?? 0);
  const transactions = wallet?.transactions ?? [];

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <div className="max-w-3xl mx-auto space-y-8">

      {/* BALANCE CARD */}

      <Card className="text-center py-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">

        <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">
          Available for Withdrawal
        </p>

        <h1 className="text-5xl font-black mb-8">
          {formatCurrency(balance)}
        </h1>

        <div className="flex justify-center gap-4">

          <Button
            variant="success"
            disabled={loading || balance === 0}
          >
            Withdraw to Bank
          </Button>

          <Button
            variant="outline"
            className="text-white border-white hover:bg-white/10"
          >
            View Policies
          </Button>

        </div>

      </Card>

      {/* TRANSACTION HISTORY */}

      <div className="space-y-4">

        <h3 className="font-bold text-slate-800">
          Transaction History
        </h3>

        {transactions.length === 0 && (

          <p className="text-sm text-slate-500">
            No transactions yet.
          </p>

        )}

        {transactions.map((tx) => {

          const amount = Number(tx.amount);
          const isCredit = tx.type === 'CREDIT';

          return (

            <div
              key={tx.id}
              className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center"
            >

              <div>

                <p className="text-sm font-bold text-slate-900">
                  Reference ID: {tx.referenceId || '—'}
                </p>

                <p className="text-xs text-slate-500">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </p>

              </div>

              <span
                className={`font-bold ${
                  isCredit
                    ? 'text-emerald-600'
                    : 'text-red-500'
                }`}
              >
                {isCredit ? '+' : '-'}
                {formatCurrency(amount)}
              </span>

            </div>

          );

        })}

      </div>

    </div>

  );

};

export default AgentWallet;