import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Clock, MapPin } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';

const ParentExams = () => {
  const examSchedule = [
    {
      id: 1,
      subject: 'Mathematics',
      date: '2026-10-18',
      time: '09:00 AM - 12:00 PM',
      venue: 'Main Exam Hall A',
      syllabus: 'Chapters 1 to 6 (Algebra, Polynomials, Trigonometry)',
    },
    {
      id: 2,
      subject: 'Physics & Chemistry',
      date: '2026-10-20',
      time: '09:00 AM - 12:00 PM',
      venue: 'Main Exam Hall B',
      syllabus: 'Mechanics, Laws of Motion, Chemical Reactions',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Exam Datesheet & Syllabus"
        subtitle="Schedule of upcoming examinations and syllabus topic guides"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examSchedule.map((exam, idx) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Mid-Term Exam 2026
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-2">{exam.subject}</h3>
              </div>
              <Badge variant="indigo">{exam.date}</Badge>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-slate-400" />
                <span>Time: {exam.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-slate-400" />
                <span>Venue: {exam.venue}</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Syllabus Coverage</p>
              <p className="text-xs font-medium text-slate-700 mt-1">{exam.syllabus}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParentExams;
