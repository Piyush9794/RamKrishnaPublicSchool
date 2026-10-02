import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Search, Eye, Download, Printer } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';
import Pagination from '../../../components/common/Pagination';

const SAMPLE_RESULTS = Array.from({ length: 20 }, (_, i) => ({
  id: `RES${1000 + i}`,
  studentId: `STU${1000 + i}`,
  name: ['Aarav Sharma', 'Priya Patel', 'Rohan Mehta', 'Ananya Singh', 'Karan Joshi'][i % 5],
  class: `Class ${9 + (i % 4)}`,
  exam: ['Mid-Term Examination', 'Annual Examination', 'Unit Test 1'][i % 3],
  totalMarks: 500,
  obtained: [475, 320, 410, 380, 445][i % 5],
  percentage: [95, 64, 82, 76, 89][i % 5],
  grade: ['A+', 'C', 'B+', 'B', 'A'][i % 5],
  status: [true, true, true, true, false][i % 5] ? 'Pass' : 'Fail',
}));

const gradeColors = { 'A+': 'success', 'A': 'success', 'B+': 'primary', 'B': 'info', 'C': 'warning', 'D': 'danger', 'F': 'danger' };

const ResultsPage = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = SAMPLE_RESULTS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Results"
        subtitle="View and publish examination results and report cards"
        icon={<BarChart3 size={20} className="text-indigo-600" />}
      />

      <div className="bg-white rounded-2xl p-4 card-shadow flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student name..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">
          <Download size={15} /> Export
        </button>
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Student', 'Class', 'Exam', 'Marks', 'Percentage', 'Grade', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.map((r, i) => (
                <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-900">{r.name}</p>
                      <p className="text-xs text-slate-400">{r.studentId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.class}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-[180px] truncate">{r.exam}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{r.obtained}/{r.totalMarks}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${r.percentage >= 75 ? 'bg-emerald-500' : r.percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${r.percentage}%` }} />
                      </div>
                      <span className="text-slate-700 font-medium">{r.percentage}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge variant={gradeColors[r.grade] || 'secondary'} size="sm">{r.grade}</Badge></td>
                  <td className="px-4 py-3"><Badge variant={r.status === 'Pass' ? 'success' : 'danger'} size="sm">{r.status}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600"><Eye size={15} /></button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><Printer size={15} /></button>
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

export default ResultsPage;
