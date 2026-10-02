import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, Save, RotateCcw, CheckSquare, Users } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';

const CLASSES = ['Class 9-A', 'Class 9-B', 'Class 10-A', 'Class 10-B'];
const STATUSES = [
  { value: 'Present', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', activeBg: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'Absent', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', activeBg: 'bg-red-500 text-white border-red-500' },
  { value: 'Late', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', activeBg: 'bg-amber-500 text-white border-amber-500' },
  { value: 'Half Day', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', activeBg: 'bg-blue-500 text-white border-blue-500' },
];

const MOCK_STUDENTS = [
  { id: 'STU1000', rollNo: '001', name: 'Aarav Sharma', gender: 'M' },
  { id: 'STU1001', rollNo: '002', name: 'Priya Patel', gender: 'F' },
  { id: 'STU1002', rollNo: '003', name: 'Rohan Mehta', gender: 'M' },
  { id: 'STU1003', rollNo: '004', name: 'Ananya Singh', gender: 'F' },
  { id: 'STU1004', rollNo: '005', name: 'Karan Joshi', gender: 'M' },
  { id: 'STU1005', rollNo: '006', name: 'Neha Gupta', gender: 'F' },
  { id: 'STU1006', rollNo: '007', name: 'Arjun Verma', gender: 'M' },
  { id: 'STU1007', rollNo: '008', name: 'Pooja Agarwal', gender: 'F' },
  { id: 'STU1008', rollNo: '009', name: 'Vikram Singh', gender: 'M' },
  { id: 'STU1009', rollNo: '010', name: 'Sanya Malhotra', gender: 'F' },
];

const StudentAttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('Class 9-A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState(() =>
    Object.fromEntries(MOCK_STUDENTS.map(s => [s.id, 'Present']))
  );
  const [remarks, setRemarks] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setStatus = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
    setSubmitted(false);
  };

  const markAllPresent = () => {
    setAttendance(Object.fromEntries(MOCK_STUDENTS.map(s => [s.id, 'Present'])));
    setSubmitted(false);
  };

  const reset = () => {
    setAttendance(Object.fromEntries(MOCK_STUDENTS.map(s => [s.id, 'Present'])));
    setRemarks({});
    setSubmitted(false);
  };

  const handleSave = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000)); // simulate API
    setSubmitted(true);
    setSubmitting(false);
  };

  const counts = STATUSES.reduce((acc, s) => {
    acc[s.value] = Object.values(attendance).filter(v => v === s.value).length;
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <PageHeader title="Student Attendance" subtitle="Mark daily attendance for your assigned classes" />

      {/* Controls */}
      <div className="bg-white rounded-2xl card-shadow p-4 flex flex-col sm:flex-row gap-3">
        <select value={selectedClass} onChange={e => { setSelectedClass(e.target.value); setSubmitted(false); }} className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white font-medium">
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
        <input type="date" value={date} onChange={e => { setDate(e.target.value); setSubmitted(false); }} className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
        <div className="flex gap-2 ml-auto">
          <button onClick={markAllPresent} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-emerald-200 text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
            <CheckSquare size={14} /> All Present
          </button>
          <button onClick={reset} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        {STATUSES.map(s => (
          <div key={s.value} className={`rounded-xl p-3 text-center ${s.bg}`}>
            <p className={`text-xl font-bold ${s.color}`}>{counts[s.value]}</p>
            <p className="text-xs text-slate-600 mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Student List */}
      <div className="bg-white rounded-2xl card-shadow divide-y divide-slate-50">
        {MOCK_STUDENTS.map((student, i) => {
          const currentStatus = attendance[student.id];
          return (
            <motion.div key={student.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {student.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{student.name}</p>
                <p className="text-xs text-slate-400">Roll: {student.rollNo} · {student.gender}</p>
              </div>
              <div className="flex gap-1">
                {STATUSES.map(s => {
                  const Icon = s.icon;
                  const isActive = currentStatus === s.value;
                  return (
                    <button
                      key={s.value}
                      onClick={() => setStatus(student.id, s.value)}
                      title={s.value}
                      className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${isActive ? s.activeBg : `border-slate-200 ${s.color} bg-white hover:${s.bg}`}`}
                    >
                      <Icon size={14} />
                    </button>
                  );
                })}
              </div>
              <input
                value={remarks[student.id] || ''}
                onChange={e => setRemarks(prev => ({ ...prev, [student.id]: e.target.value }))}
                placeholder="Remark"
                className="hidden sm:block w-24 lg:w-32 text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
              <CheckCircle2 size={16} /> Attendance saved!
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={handleSave}
          disabled={submitting || submitted}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-500 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <Save size={15} /> {submitting ? 'Saving...' : submitted ? 'Saved' : 'Save Attendance'}
        </button>
      </div>
    </div>
  );
};

export default StudentAttendancePage;
