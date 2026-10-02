import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, Search, Calendar, Download, Filter } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';
import Pagination from '../../../components/common/Pagination';

const CLASSES = ['All Classes', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const SECTIONS = ['All Sections', 'A', 'B', 'C'];

const SAMPLE_DATA = Array.from({ length: 30 }, (_, i) => ({
  id: `STU${1000 + i}`,
  name: ['Aarav Sharma', 'Priya Patel', 'Rohan Mehta', 'Ananya Singh', 'Karan Joshi'][i % 5],
  class: `Class ${6 + (i % 7)}`,
  section: ['A', 'B', 'C'][i % 3],
  rollNo: String(i + 1).padStart(3, '0'),
  status: ['Present', 'Present', 'Present', 'Absent', 'Late'][i % 5],
}));

const statusConfig = {
  Present: { color: 'success', icon: CheckCircle2, iconClass: 'text-emerald-500' },
  Absent: { color: 'danger', icon: XCircle, iconClass: 'text-red-500' },
  Late: { color: 'warning', icon: Clock, iconClass: 'text-amber-500' },
};

const StudentAttendancePage = () => {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedSection, setSelectedSection] = useState('All Sections');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = SAMPLE_DATA.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchClass = selectedClass === 'All Classes' || s.class === selectedClass;
    const matchSection = selectedSection === 'All Sections' || s.section === selectedSection;
    return matchSearch && matchClass && matchSection;
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totals = {
    Present: SAMPLE_DATA.filter(s => s.status === 'Present').length,
    Absent: SAMPLE_DATA.filter(s => s.status === 'Absent').length,
    Late: SAMPLE_DATA.filter(s => s.status === 'Late').length,
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Student Attendance" subtitle="View and manage daily attendance records" />

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(totals).map(([status, count]) => {
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          return (
            <div key={status} className="bg-white rounded-2xl card-shadow p-4 text-center">
              <Icon size={24} className={`mx-auto mb-2 ${cfg.iconClass}`} />
              <p className="text-2xl font-bold text-slate-900">{count}</p>
              <p className="text-sm text-slate-500">{status}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 card-shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="relative lg:col-span-2">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white">
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white">
          {SECTIONS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Student ID', 'Name', 'Class', 'Roll No.', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.map((s, i) => {
                const cfg = statusConfig[s.status];
                const Icon = cfg.icon;
                return (
                  <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{s.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {s.name.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-900">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{s.class}-{s.section}</td>
                    <td className="px-4 py-3 text-slate-600">{s.rollNo}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${cfg.iconClass}`}>
                        <Icon size={14} /> {s.status}
                      </span>
                    </td>
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

export default StudentAttendancePage;
