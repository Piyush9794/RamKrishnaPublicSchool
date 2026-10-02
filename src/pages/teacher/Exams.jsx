import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';

const TeacherExams = () => {
  const [exams] = useState([
    {
      id: 1,
      title: 'Mid-Term Mathematics Examination 2026',
      class: 'Class 10-A',
      subject: 'Mathematics',
      date: '2026-10-18',
      time: '09:00 AM - 12:00 PM',
      room: 'Main Examination Hall A',
      totalMarks: 100,
      status: 'Upcoming',
    },
    {
      id: 2,
      title: 'Mid-Term Advanced Calculus Examination 2026',
      class: 'Class 12-A',
      subject: 'Advanced Calculus',
      date: '2026-10-20',
      time: '09:00 AM - 12:00 PM',
      room: 'Main Examination Hall B',
      totalMarks: 100,
      status: 'Upcoming',
    },
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assigned Exams"
        subtitle="Schedule and details of upcoming examinations for your assigned classes"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exams.map((exam, idx) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {exam.class} • {exam.subject}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-2">{exam.title}</h3>
              </div>
              <Badge variant="indigo">{exam.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-slate-400" />
                <span>Date: {exam.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-slate-400" />
                <span>Time: {exam.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-slate-400" />
                <span>Venue: {exam.room}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-slate-400" />
                <span>Total Marks: {exam.totalMarks}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeacherExams;
