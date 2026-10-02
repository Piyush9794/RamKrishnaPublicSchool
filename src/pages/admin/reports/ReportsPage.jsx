import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Download, Calendar, Filter, TrendingUp, Users, DollarSign, FileText } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';

const REPORT_TYPES = [
  { id: 'student', label: 'Student Report', icon: Users, color: 'bg-blue-50 text-blue-600', desc: 'Enrollment, demographics, class-wise data' },
  { id: 'attendance', label: 'Attendance Report', icon: Calendar, color: 'bg-emerald-50 text-emerald-600', desc: 'Daily, weekly and monthly attendance summary' },
  { id: 'fee', label: 'Fee Report', icon: DollarSign, color: 'bg-amber-50 text-amber-600', desc: 'Collection, pending and overdue fee analysis' },
  { id: 'exam', label: 'Exam Performance', icon: FileText, color: 'bg-violet-50 text-violet-600', desc: 'Result analysis, grade distribution, toppers' },
  { id: 'teacher', label: 'Teacher Report', icon: TrendingUp, color: 'bg-pink-50 text-pink-600', desc: 'Teacher attendance, performance and leave' },
];

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateFrom, setDateFrom] = useState('2026-04-01');
  const [dateTo, setDateTo] = useState('2026-10-02');
  const [selectedClass, setSelectedClass] = useState('All Classes');

  return (
    <div className="space-y-5">
      <PageHeader
        title="Reports"
        subtitle="Generate and export school reports"
        icon={<PieChart size={20} className="text-indigo-600" />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {REPORT_TYPES.map(report => {
          const Icon = report.icon;
          const isSelected = selectedReport === report.id;
          return (
            <motion.button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              whileTap={{ scale: 0.97 }}
              className={`text-left p-5 rounded-2xl border-2 transition-all ${isSelected ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-slate-100 bg-white hover:border-indigo-200 card-shadow'}`}
            >
              <div className={`w-11 h-11 ${report.color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={22} />
              </div>
              <p className="font-semibold text-slate-900 text-sm">{report.label}</p>
              <p className="text-xs text-slate-500 mt-1">{report.desc}</p>
            </motion.button>
          );
        })}
      </div>

      {selectedReport && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl card-shadow p-6">
          <h3 className="font-semibold text-slate-900 mb-4">
            {REPORT_TYPES.find(r => r.id === selectedReport)?.label} — Filters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">From Date</label>
              <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">To Date</label>
              <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Class</label>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white">
                {['All Classes', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors">
              <Filter size={15} /> Generate Report
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              <Download size={15} /> Export PDF
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              <Download size={15} /> Export Excel
            </button>
          </div>

          {/* Placeholder report preview */}
          <div className="mt-6 p-8 bg-slate-50 rounded-xl text-center text-slate-400">
            <PieChart size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="text-sm">Generate a report to preview data here.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReportsPage;
