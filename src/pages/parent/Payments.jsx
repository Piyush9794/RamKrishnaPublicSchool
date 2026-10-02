import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Download, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import toast from '../../utils/toast';

const ParentPayments = () => {
  const [showPayModal, setShowPayModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [paymentHistory, setPaymentHistory] = useState([
    { id: 'PAY-8801', date: '2026-07-10', amount: '$1,375', method: 'Credit Card (**** 4242)', receiptNo: 'REC-2026-0491', status: 'Success' },
    { id: 'PAY-7412', date: '2026-04-10', amount: '$1,375', method: 'Net Banking (HDFC)', receiptNo: 'REC-2026-0182', status: 'Success' },
  ]);

  const handlePaySubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newPay = {
        id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        amount: '$450',
        method: paymentMethod === 'card' ? 'Credit Card (**** 8812)' : 'UPI Payment',
        receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Success',
      };
      setPaymentHistory([newPay, ...paymentHistory]);
      toast.success('Payment of $450 processed successfully!');
      setShowPayModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments & Online Checkout"
        subtitle="Pay outstanding school fees securely online and access transaction history"
        action={
          <Button icon={<CreditCard size={16} />} onClick={() => setShowPayModal(true)}>
            Pay $450 Outstanding
          </Button>
        }
      />

      {/* Payment Box */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">Pending Installment</span>
          <h2 className="text-2xl font-bold mt-1">Q3 Tuition & Lab Fee</h2>
          <p className="text-xs text-emerald-100 mt-1">Due Date: October 15, 2026</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-extrabold">$450.00</p>
          <Button variant="outline" className="mt-2 bg-white/10 hover:bg-white/20 border-white/30 text-white" onClick={() => setShowPayModal(true)}>
            Pay Now
          </Button>
        </div>
      </div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
      >
        <h3 className="text-base font-bold text-slate-800">Transaction History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="py-3 px-4">Txn ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paymentHistory.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{pay.id}</td>
                  <td className="py-3 px-4 text-slate-500">{pay.date}</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">{pay.amount}</td>
                  <td className="py-3 px-4 text-xs text-slate-600">{pay.method}</td>
                  <td className="py-3 px-4">
                    <Badge variant="emerald">{pay.status}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" icon={<Download size={14} />}>
                      {pay.receiptNo}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payment Modal */}
      <Modal isOpen={showPayModal} onClose={() => setShowPayModal(false)} title="Secure Online Fee Payment">
        <form onSubmit={handlePaySubmit} className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Amount to Pay</p>
              <p className="text-xl font-bold text-emerald-700">$450.00 USD</p>
            </div>
            <ShieldCheck size={28} className="text-emerald-600" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Select Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  paymentMethod === 'card'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Net Banking / UPI
              </button>
            </div>
          </div>

          {paymentMethod === 'card' ? (
            <div className="space-y-3">
              <Input label="Cardholder Name" placeholder="John Wright" required />
              <Input label="Card Number" placeholder="4532 •••• •••• 8812" required />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Expiry Date" placeholder="MM/YY" required />
                <Input label="CVV" type="password" maxLength={4} placeholder="•••" required />
              </div>
            </div>
          ) : (
            <Input label="UPI ID / VPA" placeholder="username@bank" required />
          )}

          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setShowPayModal(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? 'Processing Payment...' : 'Confirm & Pay $450'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ParentPayments;
