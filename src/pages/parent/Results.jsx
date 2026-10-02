import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Printer, CheckCircle2, FileText } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import toast from '../../utils/toast';

const ParentResults = () => {
  const [selectedTerm, setSelectedTerm] = useState('First Term Exam 2026');

  const reportCard = {
    term: 'First Term Exam 2026',
    studentName: 'Alexander Wright',
    class: 'Class 10-A',
    rollNo: '101',
    rank: '3rd in Class',
    gpa: '3.85 / 4.0',
    totalPercentage: '91.2%',
    teacherRemarks: 'Alexander shows exemplary analytical thinking in Mathematics and Science. Continued dedication will ensure top academic performance.',
    subjects: [
      { name: 'Mathematics', maxMarks: 100, obtained: 95, grade: 'A+' },
      { name: 'Physics', maxMarks: 100, obtained: 92, grade: 'A+' },
      { name: 'Chemistry', maxMarks: 100, obtained: 88, grade: 'A' },
      { name: 'English Literature', maxMarks: 100, obtained: 86, grade: 'A' },
      { name: 'Social Studies', maxMarks: 100, obtained: 90, grade: 'A+' },
    ],
  };

  const handleDownload = () => {
    toast.success('Downloading Official Student Report Card (PDF)...');
    window.print();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Report Cards & Results"
        subtitle="View term exam performance, marks breakdown, and download official report cards"
        action={
          <Button icon={<Download size={16} />} onClick={handleDownload}>
            Download Report Card
          </Button>
        }
      />

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
        {/* Header summary */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{reportCard.term}</span>
            <h2 className="text-xl font-bold text-slate-800 mt-0.5">{reportCard.studentName}</h2>
            <p className="text-xs text-slate-500">{reportCard.class} • Roll No: {reportCard.rollNo}</p>
          </div>

          <div className="flex gap-4 text-center">
            <div className="px-4 py-2 bg-white rounded-xl shadow-2xs">
              <p className="text-xs text-slate-400">Total Score</p>
              <p className="text-lg font-bold text-emerald-700">{reportCard.totalPercentage}</p>
            </div>
            <div className="px-4 py-2 bg-white rounded-xl shadow-2xs">
              <p className="text-xs text-slate-400">Class Rank</p>
              <p className="text-lg font-bold text-indigo-700">{reportCard.rank}</p>
            </div>
          </div>
        </div>

        {/* Marks Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Max Marks</th>
                <th className="py-3 px-4">Marks Obtained</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportCard.subjects.map((sub, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold text-slate-800">{sub.name}</td>
                  <td className="py-3 px-4 text-slate-500">{sub.maxMarks}</td>
                  <td className="py-3 px-4 font-bold text-indigo-700">{sub.obtained}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{sub.obtained}%</td>
                  <td className="py-3 px-4">
                    <Badge variant="emerald">{sub.grade}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Remarks */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class Teacher Remarks</p>
          <p className="text-sm text-slate-700 italic">"{reportCard.teacherRemarks}"</p>
        </div>
      </div>
    </div>
  );
};

export default ParentResults;
