import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Save, CheckCircle2, Search } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import SearchInput from '../../components/common/SearchInput';
import toast from '../../utils/toast';

const MarksEntry = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [selectedExam, setSelectedExam] = useState('Unit Test 1');
  const [search, setSearch] = useState('');

  const [students, setStudents] = useState([
    { id: 'STU-101', rollNo: '101', name: 'Alexander Wright', marks: 88, maxMarks: 100, remarks: 'Excellent' },
    { id: 'STU-102', rollNo: '102', name: 'Sophia Martinez', marks: 92, maxMarks: 100, remarks: 'Outstanding' },
    { id: 'STU-103', rollNo: '103', name: 'Ethan Hunt', marks: 74, maxMarks: 100, remarks: 'Good improvement' },
    { id: 'STU-104', rollNo: '104', name: 'Emma Watson', marks: 95, maxMarks: 100, remarks: 'Top Scorer' },
    { id: 'STU-105', rollNo: '105', name: 'Lucas Scott', marks: 61, maxMarks: 100, remarks: 'Needs revision in algebra' },
  ]);

  const handleMarkChange = (id, newMarks) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, marks: Number(newMarks) } : s))
    );
  };

  const handleRemarkChange = (id, newRemark) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, remarks: newRemark } : s))
    );
  };

  const handleSaveMarks = () => {
    toast.success(`Marks saved successfully for ${selectedClass} - ${selectedExam}!`);
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.includes(search)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marks Entry"
        subtitle="Enter and submit student exam marks and feedback remarks"
        action={
          <Button icon={<Save size={16} />} onClick={handleSaveMarks}>
            Save Marks
          </Button>
        }
      />

      {/* Selectors */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Select Class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          options={[
            { value: 'Class 10-A', label: 'Class 10-A' },
            { value: 'Class 10-B', label: 'Class 10-B' },
            { value: 'Class 12-A', label: 'Class 12-A' },
          ]}
        />
        <Select
          label="Select Examination"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          options={[
            { value: 'Unit Test 1', label: 'Unit Test 1' },
            { value: 'Mid-Term Exam', label: 'Mid-Term Exam' },
            { value: 'Final Pre-Board', label: 'Final Pre-Board' },
          ]}
        />
        <div className="flex flex-col justify-end">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student or roll no..."
          />
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Marks Obtained (Out of 100)</th>
                <th className="py-3.5 px-4">Grade</th>
                <th className="py-3.5 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((student) => {
                const percentage = student.marks;
                let grade = 'F';
                let gradeColor = 'text-red-600 bg-red-50';
                if (percentage >= 90) { grade = 'A+'; gradeColor = 'text-emerald-700 bg-emerald-50'; }
                else if (percentage >= 80) { grade = 'A'; gradeColor = 'text-indigo-700 bg-indigo-50'; }
                else if (percentage >= 70) { grade = 'B'; gradeColor = 'text-blue-700 bg-blue-50'; }
                else if (percentage >= 60) { grade = 'C'; gradeColor = 'text-amber-700 bg-amber-50'; }

                return (
                  <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{student.rollNo}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{student.name}</td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.marks}
                        onChange={(e) => handleMarkChange(student.id, e.target.value)}
                        className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-400 outline-none"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${gradeColor}`}>
                        {grade}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={student.remarks}
                        onChange={(e) => handleRemarkChange(student.id, e.target.value)}
                        placeholder="Add teacher remarks..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-400 outline-none"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default MarksEntry;
