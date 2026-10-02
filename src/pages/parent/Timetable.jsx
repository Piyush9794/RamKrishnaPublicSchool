import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

const ParentTimetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const schedule = {
    Monday: [
      { period: 'Period 1 (08:30 - 09:30)', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 302' },
      { period: 'Period 2 (09:30 - 10:30)', subject: 'Physics', teacher: 'Dr. Alan Vance', room: 'Lab 1' },
      { period: 'Period 4 (11:45 - 12:45)', subject: 'English', teacher: 'David Miller', room: 'Room 302' },
    ],
    Tuesday: [
      { period: 'Period 1 (08:30 - 09:30)', subject: 'Chemistry', teacher: 'Maria Garcia', room: 'Lab 3' },
      { period: 'Period 3 (10:45 - 11:45)', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 302' },
    ],
    Wednesday: [
      { period: 'Period 2 (09:30 - 10:30)', subject: 'Computer Science', teacher: 'James Wilson', room: 'CS Lab' },
      { period: 'Period 4 (11:45 - 12:45)', subject: 'Physics', teacher: 'Dr. Alan Vance', room: 'Room 302' },
    ],
    Thursday: [
      { period: 'Period 1 (08:30 - 09:30)', subject: 'Mathematics', teacher: 'Sarah Jenkins', room: 'Room 302' },
      { period: 'Period 3 (10:45 - 11:45)', subject: 'Social Studies', teacher: 'Anna Taylor', room: 'Room 302' },
    ],
    Friday: [
      { period: 'Period 2 (09:30 - 10:30)', subject: 'Biology', teacher: 'Dr. Helen Carter', room: 'Bio Lab' },
      { period: 'Period 5 (01:30 - 02:30)', subject: 'Sports / Physical Ed', teacher: 'Coach Roberts', room: 'Ground' },
    ],
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Class Weekly Timetable"
        subtitle="Child's weekly class schedule and period assignments"
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
            <div className="p-4 bg-emerald-700 text-white font-bold text-center text-sm">
              {day}
            </div>

            <div className="p-3 space-y-3 flex-1 bg-slate-50/50">
              {schedule[day]?.map((item, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {item.period}
                  </span>
                  <p className="text-sm font-bold text-slate-800">{item.subject}</p>
                  <p className="text-xs text-slate-500">{item.teacher}</p>
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

export default ParentTimetable;
