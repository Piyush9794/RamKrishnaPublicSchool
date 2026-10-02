import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Plus, Search, Eye, Edit2, Trash2, Tag } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';

const CATEGORIES = ['All', 'General', 'Attendance', 'Fee', 'Exam', 'Homework', 'Result', 'Holiday', 'Emergency'];
const AUDIENCES = ['All', 'School', 'Class', 'Section', 'Teacher', 'Parent'];

const categoryConfig = {
  General: 'secondary', Attendance: 'info', Fee: 'warning', Exam: 'primary',
  Homework: 'success', Result: 'info', Holiday: 'success', Emergency: 'danger'
};

const SAMPLE_NOTICES = [
  { id: 1, title: 'Sports Day 2026', category: 'General', audience: 'School', date: '2026-10-01', priority: 'Normal', author: 'Admin', content: 'Annual Sports Day will be held on October 20, 2026. All students must participate.' },
  { id: 2, title: 'Fee Payment Reminder', category: 'Fee', audience: 'Parent', date: '2026-09-28', priority: 'High', author: 'Accounts', content: 'Please ensure fee payment by October 31, 2026 to avoid late charges.' },
  { id: 3, title: 'Mid-Term Exam Schedule', category: 'Exam', audience: 'School', date: '2026-09-25', priority: 'High', author: 'Admin', content: 'Mid-Term exams will begin from October 15, 2026.' },
  { id: 4, title: 'Diwali Holiday Notice', category: 'Holiday', audience: 'School', date: '2026-09-20', priority: 'Normal', author: 'Admin', content: 'School will remain closed from October 20–25, 2026 for Diwali holidays.' },
  { id: 5, title: 'Parent-Teacher Meeting', category: 'General', audience: 'Parent', date: '2026-09-15', priority: 'Normal', author: 'Admin', content: 'PTM scheduled for November 1, 2026 from 9 AM to 1 PM.' },
];

const NoticesPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = SAMPLE_NOTICES.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || n.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Notices"
        subtitle="Create and manage school notices and announcements"
        icon={<Megaphone size={20} className="text-indigo-600" />}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} /> New Notice
          </button>
        }
      />

      <div className="bg-white rounded-2xl p-4 card-shadow flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notices..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${category === cat ? 'bg-indigo-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((notice, i) => (
          <motion.div key={notice.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-white rounded-2xl card-shadow p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${notice.priority === 'High' ? 'bg-red-500' : 'bg-slate-300'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-slate-900">{notice.title}</h3>
                    <Badge variant={categoryConfig[notice.category] || 'secondary'} size="sm">{notice.category}</Badge>
                    <Badge variant="secondary" size="sm">{notice.audience}</Badge>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2">{notice.content}</p>
                  <p className="text-xs text-slate-400 mt-2">By {notice.author} · {notice.date}</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600"><Eye size={15} /></button>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><Edit2 size={15} /></button>
                <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={15} /></button>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl card-shadow p-12 text-center text-slate-500">No notices found.</div>
        )}
      </div>
    </div>
  );
};

export default NoticesPage;
