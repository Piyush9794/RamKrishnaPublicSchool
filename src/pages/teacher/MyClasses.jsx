import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Calendar, Clock, MapPin, Search, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';
import SearchInput from '../../components/common/SearchInput';
import Button from '../../components/common/Button';

const MyClasses = () => {
  const [search, setSearch] = useState('');
  const [classes] = useState([
    {
      id: 1,
      className: 'Class 10',
      section: 'A',
      subject: 'Mathematics',
      room: 'Room 302 - Block B',
      totalStudents: 38,
      boys: 20,
      girls: 18,
      classTeacher: 'Sarah Jenkins (You)',
      schedule: 'Mon, Wed, Fri • 09:00 AM - 10:00 AM',
      presentToday: 35,
      performanceAvg: '84%',
    },
    {
      id: 2,
      className: 'Class 10',
      section: 'B',
      subject: 'Mathematics',
      room: 'Room 304 - Block B',
      totalStudents: 40,
      boys: 22,
      girls: 18,
      classTeacher: 'Robert Vance',
      schedule: 'Tue, Thu • 10:15 AM - 11:15 AM',
      presentToday: 38,
      performanceAvg: '79%',
    },
    {
      id: 3,
      className: 'Class 12',
      section: 'A',
      subject: 'Advanced Calculus',
      room: 'Lab 2 - Science Wing',
      totalStudents: 32,
      boys: 17,
      girls: 15,
      classTeacher: 'Sarah Jenkins (You)',
      schedule: 'Mon, Tue, Thu • 01:30 PM - 02:30 PM',
      presentToday: 30,
      performanceAvg: '91%',
    },
  ]);

  const filtered = classes.filter(
    (c) =>
      c.className.toLowerCase().includes(search.toLowerCase()) ||
      c.section.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Classes"
        subtitle="Manage and view assigned classes, student rosters, and schedules"
      />

      <div className="flex items-center justify-between gap-4">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search class, section, subject..."
          className="max-w-md"
        />
        <p className="text-sm font-medium text-slate-500">{filtered.length} Classes Assigned</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cls, idx) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                    {cls.className} - Section {cls.section}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 mt-2">{cls.subject}</h3>
                </div>
                <Badge variant={cls.classTeacher.includes('You') ? 'emerald' : 'indigo'}>
                  {cls.classTeacher.includes('You') ? 'Class Teacher' : 'Subject Teacher'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-slate-400 shrink-0" />
                  <span>{cls.room}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-slate-400 shrink-0" />
                  <span className="text-xs">{cls.schedule}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400">Students</p>
                  <p className="text-base font-bold text-slate-800">{cls.totalStudents}</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-emerald-600">Present Today</p>
                  <p className="text-base font-bold text-emerald-700">{cls.presentToday}</p>
                </div>
                <div className="p-2 bg-indigo-50 rounded-xl">
                  <p className="text-xs text-indigo-600">Avg Performance</p>
                  <p className="text-base font-bold text-indigo-700">{cls.performanceAvg}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Boys: {cls.boys} • Girls: {cls.girls}</span>
              <Button variant="ghost" size="sm" icon={<ChevronRight size={16} />}>
                View Roster
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
