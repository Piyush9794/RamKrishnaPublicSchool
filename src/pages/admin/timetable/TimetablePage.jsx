import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PERIODS = ['8:00–8:45', '8:45–9:30', '9:30–10:15', '10:15–10:30 (Break)', '10:30–11:15', '11:15–12:00', '12:00–12:45 (Lunch)', '12:45–1:30', '1:30–2:15', '2:15–3:00'];

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Hindi', 'Biology', 'Social Science', 'Computer Science'];
const COLORS = ['bg-blue-100 text-blue-800', 'bg-violet-100 text-violet-800', 'bg-emerald-100 text-emerald-800', 'bg-amber-100 text-amber-800', 'bg-pink-100 text-pink-800', 'bg-cyan-100 text-cyan-800', 'bg-orange-100 text-orange-800', 'bg-teal-100 text-teal-800'];

const TIMETABLE = {};
DAYS.forEach((day, di) => {
  TIMETABLE[day] = PERIODS.map((period, pi) => {
    if (period.includes('Break') || period.includes('Lunch')) return null;
    const subIdx = (di * 8 + pi) % SUBJECTS.length;
    return { subject: SUBJECTS[subIdx], teacher: 'T. Kumar', color: COLORS[subIdx] };
  });
});

const TimetablePage = () => {
  const [selectedClass, setSelectedClass] = useState('Class 9-A');
  const CLASSES = ['Class 6-A', 'Class 7-A', 'Class 8-A', 'Class 9-A', 'Class 10-A', 'Class 11-A', 'Class 12-A'];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Timetable"
        subtitle="Weekly class schedule management"
        icon={<CalendarDays size={20} className="text-indigo-600" />}
      />

      <div className="bg-white rounded-2xl p-4 card-shadow flex items-center justify-between flex-wrap gap-3">
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white font-medium"
        >
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft size={18} className="text-slate-500" /></button>
          <span className="text-sm font-medium text-slate-700">Week of Oct 2–7, 2026</span>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight size={18} className="text-slate-500" /></button>
        </div>
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap w-28">Time</th>
                {DAYS.map(day => (
                  <th key={day} className="text-center px-3 py-3 text-xs font-semibold text-slate-700 whitespace-nowrap">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PERIODS.map((period, pi) => {
                const isBreak = period.includes('Break') || period.includes('Lunch');
                return (
                  <tr key={pi} className={isBreak ? 'bg-slate-50/60' : 'hover:bg-slate-50/30 transition-colors'}>
                    <td className="px-4 py-2.5 text-xs text-slate-500 font-medium whitespace-nowrap">{period}</td>
                    {DAYS.map(day => {
                      const cell = TIMETABLE[day][pi];
                      if (isBreak) return <td key={day} className="px-3 py-2.5 text-center text-xs text-slate-400 italic">{period.includes('Break') ? 'Break' : 'Lunch'}</td>;
                      return (
                        <td key={day} className="px-3 py-2">
                          {cell && (
                            <div className={`${cell.color} rounded-lg px-2 py-1.5 text-center`}>
                              <p className="font-semibold text-xs leading-tight">{cell.subject}</p>
                              <p className="text-xs opacity-70 mt-0.5">{cell.teacher}</p>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
