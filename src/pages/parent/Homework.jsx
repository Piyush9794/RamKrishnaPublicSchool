import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Calendar, CheckCircle2, Clock } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';

const ParentHomework = () => {
  const homeworkItems = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Quadratic Equations Practice Set 4.2',
      teacher: 'Sarah Jenkins',
      assignedDate: '2026-10-01',
      dueDate: '2026-10-05',
      status: 'Pending',
      instructions: 'Solve problems 1 to 15 in chapter notebook.',
    },
    {
      id: 2,
      subject: 'Physics',
      title: 'Laws of Motion Worksheet',
      teacher: 'Dr. Alan Vance',
      assignedDate: '2026-09-28',
      dueDate: '2026-10-02',
      status: 'Submitted',
      instructions: 'Complete physics numerical problems 1-10.',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Child Homework"
        subtitle="Track assigned daily homework, instructions, and submission deadlines"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homeworkItems.map((hw, idx) => (
          <motion.div
            key={hw.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {hw.subject} • Teacher: {hw.teacher}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-2">{hw.title}</h3>
              </div>
              <Badge variant={hw.status === 'Submitted' ? 'emerald' : 'amber'}>
                {hw.status}
              </Badge>
            </div>

            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {hw.instructions}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
              <span>Assigned: {hw.assignedDate}</span>
              <span className="font-semibold text-slate-700">Due Date: {hw.dueDate}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParentHomework;
