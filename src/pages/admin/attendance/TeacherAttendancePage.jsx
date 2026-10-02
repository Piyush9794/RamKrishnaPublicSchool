import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, MapPin, Search } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Pagination from '../../../components/common/Pagination';

const SAMPLE_TEACHERS = Array.from({ length: 15 }, (_, i) => ({
  id: `TCH${100 + i}`,
  name: ['Suresh Kumar', 'Priti Agarwal', 'Mohammed Ali', 'Sunita Verma', 'Deepak Jain'][i % 5],
  employeeId: `EMP${2000 + i}`,
  status: ['Present', 'Present', 'Present', 'Absent', 'Late'][i % 5],
  checkIn: i % 5 !== 3 ? '08:45 AM' : '—',
  location: i % 5 !== 3 ? `${26.84 + i * 0.001}°N, ${80.94 + i * 0.001}°E` : '—',
  accuracy: i % 5 !== 3 ? `${12 + i}m` : '—',
}));

const statusConfig = {
  Present: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
  Absent: { color: 'text-red-500', bg: 'bg-red-50', icon: XCircle },
  Late: { color: 'text-amber-500', bg: 'bg-amber-50', icon: Clock },
};

const TeacherAttendancePage = () => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = SAMPLE_TEACHERS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.employeeId.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totals = {
    Present: SAMPLE_TEACHERS.filter(t => t.status === 'Present').length,
    Absent: SAMPLE_TEACHERS.filter(t => t.status === 'Absent').length,
    Late: SAMPLE_TEACHERS.filter(t => t.status === 'Late').length,
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Teacher Attendance" subtitle="Teacher daily check-in records with location data" />

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(totals).map(([status, count]) => {
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          return (
            <div key={status} className={`rounded-2xl p-4 text-center ${cfg.bg}`}>
              <Icon size={24} className={`mx-auto mb-2 ${cfg.color}`} />
              <p className="text-2xl font-bold text-slate-900">{count}</p>
              <p className="text-sm text-slate-600">{status}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-4 card-shadow flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search teacher..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Employee ID', 'Name', 'Status', 'Check-In', 'Location', 'Accuracy'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.map((t, i) => {
                const cfg = statusConfig[t.status];
                const Icon = cfg.icon;
                return (
                  <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{t.employeeId}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{t.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${cfg.color}`}>
                        <Icon size={14} /> {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{t.checkIn}</td>
                    <td className="px-4 py-3">
                      {t.location !== '—' ? (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={12} /> {t.location}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{t.accuracy}</td>
                  </motion.tr>
                );
              })}
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

export default TeacherAttendancePage;
