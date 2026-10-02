import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, Download, CheckCircle2, Clock } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const ParentFees = () => {
  const navigate = useNavigate();

  const feeSummary = {
    totalFee: '$3,200',
    paidAmount: '$2,750',
    pendingAmount: '$450',
    dueDate: '2026-10-15',
    status: 'Partial',
  };

  const installments = [
    { name: 'Q1 Tuition Fee', amount: '$1,375', dueDate: '2026-04-10', status: 'Paid', receiptNo: 'REC-2026-0182' },
    { name: 'Q2 Tuition Fee', amount: '$1,375', dueDate: '2026-07-10', status: 'Paid', receiptNo: 'REC-2026-0491' },
    { name: 'Q3 Tuition & Lab Fee', amount: '$450', dueDate: '2026-10-15', status: 'Pending', receiptNo: '-' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fee Details & Accounts"
        subtitle="View student fee structure, installment due dates, and pending amounts"
        action={
          <Button icon={<CreditCard size={16} />} onClick={() => navigate('/parent/payments')}>
            Pay Outstanding Fee
          </Button>
        }
      />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Total Annual Fee</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{feeSummary.totalFee}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-emerald-600">Total Paid</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{feeSummary.paidAmount}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-amber-600">Pending Due</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{feeSummary.pendingAmount}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Next Due Date</p>
          <p className="text-lg font-bold text-slate-800 mt-1">{feeSummary.dueDate}</p>
        </div>
      </div>

      {/* Installments Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
      >
        <h3 className="text-base font-bold text-slate-800">Fee Installment Breakdown</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="py-3 px-4">Fee Head</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {installments.map((inst, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold text-slate-800">{inst.name}</td>
                  <td className="py-3 px-4 font-bold text-slate-700">{inst.amount}</td>
                  <td className="py-3 px-4 text-slate-500">{inst.dueDate}</td>
                  <td className="py-3 px-4">
                    <Badge variant={inst.status === 'Paid' ? 'emerald' : 'amber'}>
                      {inst.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-slate-500">
                    {inst.receiptNo !== '-' ? (
                      <Button variant="ghost" size="sm" icon={<Download size={14} />}>
                        {inst.receiptNo}
                      </Button>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ParentFees;
