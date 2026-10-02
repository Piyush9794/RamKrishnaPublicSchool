import React from 'react';
import { motion } from 'framer-motion';
import { FileEdit, Calendar, Award } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';

const ParentAssignments = () => {
  const assignments = [
    {
      id: 1,
      title: 'Term Project: Mathematical Modeling',
      subject: 'Mathematics',
      maxMarks: 50,
      dueDate: '2026-10-15',
      status: 'In Progress',
      marksObtained: '-',
    },
    {
      id: 2,
      title: 'Chemistry Lab Experiment Analysis',
      subject: 'Chemistry',
      maxMarks: 25,
      dueDate: '2026-09-30',
      status: 'Graded',
      marksObtained: '23 / 25',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Child Assignments & Projects"
        subtitle="Monitor long-term assignments, project deadlines, and grades"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {item.subject}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-2">{item.title}</h3>
              </div>
              <Badge variant={item.status === 'Graded' ? 'emerald' : 'indigo'}>
                {item.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span>Deadline: <strong className="text-slate-800">{item.dueDate}</strong></span>
              <span>Marks: <strong className="text-indigo-600 font-bold">{item.marksObtained}</strong> (Max: {item.maxMarks})</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParentAssignments;
