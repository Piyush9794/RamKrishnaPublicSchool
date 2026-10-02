import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Plus, Search, Eye, CreditCard } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';
import Pagination from '../../../components/common/Pagination';

const FEE_STATUSES = ['All', 'Paid', 'Pending', 'Partial', 'Overdue'];

const SAMPLE_FEES = Array.from({ length: 25 }, (_, i) => ({
  id: `FEE${1000 + i}`,
  studentId: `STU${1000 + i}`,
  studentName: ['Aarav Sharma', 'Priya Patel', 'Rohan Mehta', 'Ananya Singh', 'Karan Joshi'][i % 5],
  class: `Class ${6 + (i % 7)}`,
  totalFee: 60000,
  paid: [60000, 30000, 0, 45000, 60000][i % 5],
  due: [0, 30000, 60000, 15000, 0][i % 5],
  status: ['Paid', 'Partial', 'Pending', 'Overdue', 'Paid'][i % 5],
  dueDate: '2026-10-31',
}));

const statusConfig = {
  Paid: 'success',
  Partial: 'warning',
  Pending: 'secondary',
  Overdue: 'danger',
};

const FeesPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = SAMPLE_FEES.filter(f => {
    const matchSearch = f.studentName.toLowerCase().includes(search.toLowerCase()) || f.studentId.includes(search);
    const matchStatus = statusFilter === 'All' || f.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalCollected = SAMPLE_FEES.reduce((sum, f) => sum + f.paid, 0);
  const totalDue = SAMPLE_FEES.reduce((sum, f) => sum + f.due, 0);
  const overdue = SAMPLE_FEES.filter(f => f.status === 'Overdue').length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Fees & Accounts"
        subtitle="Manage fee collection, payments and receipts"
        icon={<DollarSign size={20} className="text-indigo-600" />}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} /> Record Payment
          </button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Collected', value: `₹${(totalCollected / 100000).toFixed(2)}L`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Pending', value: `₹${(totalDue / 100000).toFixed(2)}L`, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Overdue Cases', value: overdue, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Fully Paid', value: SAMPLE_FEES.filter(f => f.status === 'Paid').length, icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl card-shadow p-5">
              <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={22} className={card.color} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 card-shadow flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search by student name or ID..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FEE_STATUSES.map(s => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${statusFilter === s ? 'bg-indigo-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Student', 'Class', 'Total Fee', 'Paid', 'Due', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.map((f, i) => (
                <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-900">{f.studentName}</p>
                      <p className="text-xs text-slate-400">{f.studentId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{f.class}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">₹{f.totalFee.toLocaleString()}</td>
                  <td className="px-4 py-3 text-emerald-700 font-medium">₹{f.paid.toLocaleString()}</td>
                  <td className="px-4 py-3 text-red-600 font-medium">₹{f.due.toLocaleString()}</td>
                  <td className="px-4 py-3"><Badge variant={statusConfig[f.status]} size="sm">{f.status}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors"><Eye size={15} /></button>
                      <button className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors"><CreditCard size={15} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default FeesPage;
