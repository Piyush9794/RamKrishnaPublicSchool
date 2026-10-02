import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Plus, Search, Eye, Edit2, Trash2, User, Clock } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';
import Pagination from '../../../components/common/Pagination';

const SAMPLE_HOMEWORK = Array.from({ length: 18 }, (_, i) => ({
  id: `HW${1000 + i}`,
  title: ['Algebra Problems - Chapter 5', 'Essay on Climate Change', 'Newton\'s Laws Exercises', 'Map Work - India', 'Grammar Exercises'][i % 5],
  subject: ['Mathematics', 'English', 'Physics', 'Social Science', 'Hindi'][i % 5],
  class: `Class ${6 + (i % 7)}`,
  section: ['A', 'B', 'C'][i % 3],
  teacher: ['Suresh Kumar', 'Priti Agarwal', 'Mohammed Ali'][i % 3],
  assignedDate: '2026-10-01',
  dueDate: `2026-10-${String(3 + i % 5).padStart(2, '0')}`,
  status: ['Active', 'Active', 'Expired', 'Active'][i % 4],
}));

const HomeworkPage = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = SAMPLE_HOMEWORK.filter(h => h.title.toLowerCase().includes(search.toLowerCase()) || h.class.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Homework"
        subtitle="Manage and track homework assignments"
        icon={<BookMarked size={20} className="text-indigo-600" />}
      />

      <div className="bg-white rounded-2xl p-4 card-shadow flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search homework..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Title', 'Subject', 'Class', 'Teacher', 'Assigned', 'Due Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.map((hw, i) => (
                <motion.tr key={hw.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="font-medium text-slate-900 truncate">{hw.title}</p>
                    <p className="text-xs text-slate-400">{hw.id}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{hw.subject}</td>
                  <td className="px-4 py-3 text-slate-600">{hw.class}-{hw.section}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className="flex items-center gap-1"><User size={12} />{hw.teacher}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{hw.assignedDate}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-700"><Clock size={12} />{hw.dueDate}</span>
                  </td>
                  <td className="px-4 py-3"><Badge variant={hw.status === 'Active' ? 'success' : 'secondary'} size="sm">{hw.status}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600"><Eye size={15} /></button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><Edit2 size={15} /></button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={15} /></button>
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

export default HomeworkPage;
