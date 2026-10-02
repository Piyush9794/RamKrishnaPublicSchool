import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Filter, Search, User, Clock } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';
import Pagination from '../../../components/common/Pagination';

const ACTIONS = ['All', 'LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT'];

const SAMPLE_LOGS = Array.from({ length: 30 }, (_, i) => ({
  id: `LOG${10000 + i}`,
  user: ['Admin', 'Suresh Kumar (Teacher)', 'Rajesh Sharma (Parent)'][i % 3],
  action: ['LOGIN', 'CREATE', 'UPDATE', 'DELETE', 'LOGOUT', 'EXPORT'][i % 6],
  module: ['Students', 'Teachers', 'Fees', 'Exams', 'Notices', 'Reports'][i % 6],
  detail: ['Logged in successfully', 'Created new student record', 'Updated fee payment', 'Deleted homework entry', 'Session ended', 'Exported attendance report'][i % 6],
  ip: `192.168.1.${10 + i}`,
  timestamp: `2026-10-02 ${String(8 + Math.floor(i / 4)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:00`,
}));

const actionColors = {
  LOGIN: 'success', LOGOUT: 'secondary', CREATE: 'primary', UPDATE: 'warning', DELETE: 'danger', EXPORT: 'info'
};

const AuditLogsPage = () => {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const filtered = SAMPLE_LOGS.filter(log => {
    const matchSearch = log.user.toLowerCase().includes(search.toLowerCase()) || log.detail.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === 'All' || log.action === actionFilter;
    return matchSearch && matchAction;
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Audit Logs"
        subtitle="System activity and access logs"
        icon={<Shield size={20} className="text-indigo-600" />}
      />

      <div className="bg-white rounded-2xl p-4 card-shadow flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {ACTIONS.map(a => (
            <button key={a} onClick={() => setActionFilter(a)} className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${actionFilter === a ? 'bg-indigo-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Log ID', 'User', 'Action', 'Module', 'Details', 'IP Address', 'Timestamp'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.map((log, i) => (
                <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">{log.id}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-slate-700"><User size={12} className="text-slate-400" />{log.user}</span>
                  </td>
                  <td className="px-4 py-3"><Badge variant={actionColors[log.action]} size="sm">{log.action}</Badge></td>
                  <td className="px-4 py-3 text-slate-600">{log.module}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-[220px] truncate">{log.detail}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{log.ip}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs text-slate-500"><Clock size={12} />{log.timestamp}</span>
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

export default AuditLogsPage;
