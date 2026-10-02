import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

const TeacherTimetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const schedule = {
    Monday: [
      { period: 'Period 1 (08:30 - 09:30)', class: 'Class 10-A', subject: 'Mathematics', room: 'Room 302' },
      { period: 'Period 3 (10:45 - 11:45)', class: 'Class 10-B', subject: 'Mathematics', room: 'Room 304' },
      { period: 'Period 5 (01:30 - 02:30)', class: 'Class 12-A', subject: 'Advanced Calculus', room: 'Lab 2' },
    ],
    Tuesday: [
      { period: 'Period 2 (09:30 - 10:30)', class: 'Class 10-B', subject: 'Mathematics', room: 'Room 304' },
      { period: 'Period 5 (01:30 - 02:30)', class: 'Class 12-A', subject: 'Advanced Calculus', room: 'Lab 2' },
    ],
    Wednesday: [
      { period: 'Period 1 (08:30 - 09:30)', class: 'Class 10-A', subject: 'Mathematics', room: 'Room 302' },
      { period: 'Period 4 (11:45 - 12:45)', class: 'Class 10-B', subject: 'Mathematics', room: 'Room 304' },
    ],
    Thursday: [
      { period: 'Period 2 (09:30 - 10:30)', class: 'Class 10-B', subject: 'Mathematics', room: 'Room 304' },
      { period: 'Period 5 (01:30 - 02:30)', class: 'Class 12-A', subject: 'Advanced Calculus', room: 'Lab 2' },
    ],
    Friday: [
      { period: 'Period 1 (08:30 - 09:30)', class: 'Class 10-A', subject: 'Mathematics', room: 'Room 302' },
      { period: 'Period 3 (10:45 - 11:45)', class: 'STEM Club', subject: 'Math Olympiad Prep', room: 'Activity Hall' },
    ],
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Timetable"
        subtitle="Weekly class teaching schedule and period allocations"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {days.map((day, idx) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col"
          >
            <div className="p-4 bg-indigo-600 text-white font-bold text-center text-sm">
              {day}
            </div>

            <div className="p-3 space-y-3 flex-1 bg-slate-50/50">
              {schedule[day]?.map((item, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {item.period}
                  </span>
                  <p className="text-sm font-bold text-slate-800">{item.subject}</p>
                  <p className="text-xs font-semibold text-slate-600">{item.class}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin size={12} /> {item.room}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeacherTimetable;
