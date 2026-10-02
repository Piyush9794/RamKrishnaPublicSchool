import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Layers, CheckCircle2, Clock, FileText, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';

const MySubjects = () => {
  const [subjects] = useState([
    {
      id: 1,
      name: 'Mathematics',
      code: 'MATH-10',
      classesAssigned: ['Class 10-A', 'Class 10-B'],
      chaptersTotal: 14,
      chaptersCompleted: 9,
      syllabusProgress: 65,
      nextTopic: 'Quadratic Equations & Polynomial Graphs',
    },
    {
      id: 2,
      name: 'Advanced Calculus',
      code: 'MATH-12-ADV',
      classesAssigned: ['Class 12-A'],
      chaptersTotal: 10,
      chaptersCompleted: 7,
      syllabusProgress: 70,
      nextTopic: 'Integration by Parts & Definite Integrals',
    },
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Subjects"
        subtitle="Overview of assigned subject curricula, syllabus progress, and course materials"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub, idx) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{sub.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{sub.code}</p>
                </div>
              </div>
              <Badge variant="indigo">{sub.classesAssigned.length} Classes</Badge>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
                <span>Syllabus Progress</span>
                <span className="text-indigo-600 font-bold">{sub.syllabusProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-violet-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${sub.syllabusProgress}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {sub.chaptersCompleted} of {sub.chaptersTotal} Chapters Completed
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current / Next Topic</p>
              <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <ArrowRight size={14} className="text-indigo-600" />
                {sub.nextTopic}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              {sub.classesAssigned.map((c) => (
                <Badge key={c} variant="slate" size="xs">
                  {c}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MySubjects;
