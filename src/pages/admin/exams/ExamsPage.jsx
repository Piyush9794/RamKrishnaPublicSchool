import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Calendar, Eye, Edit2, Trash2, Search } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';

const SAMPLE_EXAMS = [
  { id: 1, name: 'Mid-Term Examination', class: 'Class 9-10', subject: 'All Subjects', date: '2026-10-15', endDate: '2026-10-25', type: 'Written', status: 'Upcoming', totalMarks: 100, passingMarks: 33 },
  { id: 2, name: 'Science Quiz', class: 'Class 8', subject: 'Science', date: '2026-10-07', endDate: '2026-10-07', type: 'MCQ', status: 'Upcoming', totalMarks: 50, passingMarks: 20 },
  { id: 3, name: 'Annual Examination', class: 'All Classes', subject: 'All Subjects', date: '2026-12-01', endDate: '2026-12-20', type: 'Written', status: 'Scheduled', totalMarks: 100, passingMarks: 33 },
  { id: 4, name: 'Unit Test 1 - Mathematics', class: 'Class 11-12', subject: 'Mathematics', date: '2026-09-10', endDate: '2026-09-10', type: 'Written', status: 'Completed', totalMarks: 25, passingMarks: 10 },
  { id: 5, name: 'Unit Test 1 - English', class: 'Class 6-8', subject: 'English', date: '2026-09-12', endDate: '2026-09-12', type: 'Written', status: 'Completed', totalMarks: 25, passingMarks: 10 },
];

const statusConfig = {
  Upcoming: 'warning',
  Scheduled: 'primary',
  Completed: 'success',
  Ongoing: 'info',
};

const ExamsPage = () => {
  const [search, setSearch] = useState('');
  const filtered = SAMPLE_EXAMS.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.class.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Examinations"
        subtitle="Create and manage school examinations"
        icon={<FileText size={20} className="text-indigo-600" />}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} /> Create Exam
          </button>
        }
      />

      <div className="bg-white rounded-2xl p-4 card-shadow flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search exams..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((exam, i) => (
          <motion.div key={exam.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl card-shadow p-5">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                  <FileText size={22} className="text-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900">{exam.name}</h3>
                    <Badge variant={statusConfig[exam.status]} size="sm">{exam.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{exam.class} · {exam.subject}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={12} />{exam.date} → {exam.endDate}</span>
                    <span>Type: {exam.type}</span>
                    <span>Total: {exam.totalMarks} marks</span>
                    <span>Passing: {exam.passingMarks} marks</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-indigo-50 rounded-xl text-indigo-600 transition-colors"><Eye size={16} /></button>
                <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"><Edit2 size={16} /></button>
                <button className="p-2 hover:bg-red-50 rounded-xl text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExamsPage;
