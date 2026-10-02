import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Calendar, Tag } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';

const ParentNotices = () => {
  const notices = [
    {
      id: 1,
      title: 'Annual Parent-Teacher Association (PTA) Meeting',
      category: 'General',
      target: 'All Parents',
      date: '2026-10-01',
      content: 'The 1st term PTA meeting is scheduled for Saturday, Oct 15th at 10:00 AM in the Main Auditorium.',
    },
    {
      id: 2,
      title: 'Math Olympiad 2026 Registration Open',
      category: 'Academic',
      target: 'Class 10 & 12',
      date: '2026-09-28',
      content: 'Encourage your child to register for the upcoming National Mathematics Olympiad by Oct 10.',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Notices & Circulars"
        subtitle="Official school announcements, holiday alerts, and academic notices"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices.map((notice, idx) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {notice.category} • {notice.target}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-2">{notice.title}</h3>
              </div>
              <Badge variant="indigo">{notice.date}</Badge>
            </div>

            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {notice.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParentNotices;
