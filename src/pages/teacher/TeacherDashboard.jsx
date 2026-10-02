import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, ClipboardList, Users, Calendar, TrendingUp,
  CheckCircle2, Clock, BookMarked, Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const QUICK_STATS = [
  { label: 'My Classes', value: '3', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'My Subjects', value: '4', icon: ClipboardList, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Students', value: '118', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Pending Tasks', value: '5', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const TODAY_CLASSES = [
  { period: '8:00 – 8:45', class: 'Class 9-A', subject: 'Mathematics', room: 'Room 201' },
  { period: '9:30 – 10:15', class: 'Class 10-B', subject: 'Mathematics', room: 'Room 203' },
  { period: '11:15 – 12:00', class: 'Class 9-B', subject: 'Mathematics', room: 'Room 201' },
  { period: '1:30 – 2:15', class: 'Class 11-A', subject: 'Mathematics', room: 'Room 205' },
];

const RECENT_TASKS = [
  { text: 'Mark homework for Class 9-A', type: 'homework', due: 'Today' },
  { text: 'Upload study material for Class 10', type: 'material', due: 'Today' },
  { text: 'Submit attendance for Class 9-B', type: 'attendance', due: 'Today' },
  { text: 'Prepare question paper for Unit Test', type: 'exam', due: 'Oct 5' },
  { text: 'Complete lesson plan for Chapter 7', type: 'lesson', due: 'Oct 6' },
];

const TeacherDashboard = () => {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Good morning, {user?.name?.split(' ')[0] || 'Teacher'}!</h1>
        <p className="text-slate-500 mt-1">{today}</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_STATS.map(stat => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={item} className="bg-white rounded-2xl card-shadow p-5">
              <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={22} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-900">Today's Schedule</h3>
          </div>
          <div className="space-y-3">
            {TODAY_CLASSES.map((cls, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-2 h-10 bg-indigo-400 rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{cls.subject} — {cls.class}</p>
                  <p className="text-xs text-slate-500">{cls.period} · {cls.room}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pending Tasks */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl card-shadow p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-amber-600" />
            <h3 className="font-semibold text-slate-900">Pending Tasks</h3>
          </div>
          <div className="space-y-2.5">
            {RECENT_TASKS.map((task, i) => (
              <div key={i} className="flex items-start gap-2.5 py-2 border-b border-slate-50 last:border-0">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${i < 3 ? 'border-red-400' : 'border-slate-300'}`}>
                  {i < 3 && <span className="w-2 h-2 bg-red-400 rounded-full" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{task.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Due: {task.due}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl card-shadow p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Mark Attendance', icon: CheckCircle2, href: '/teacher/student-attendance', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
            { label: 'Add Homework', icon: BookMarked, href: '/teacher/homework', color: 'bg-blue-50 text-blue-700 border-blue-100' },
            { label: 'Enter Marks', icon: TrendingUp, href: '/teacher/marks', color: 'bg-violet-50 text-violet-700 border-violet-100' },
            { label: 'Notifications', icon: Bell, href: '/teacher/notifications', color: 'bg-amber-50 text-amber-700 border-amber-100' },
          ].map(action => {
            const Icon = action.icon;
            return (
              <a key={action.label} href={action.href} className={`flex flex-col items-center gap-2 p-4 border rounded-xl text-center hover:shadow-sm transition-all ${action.color}`}>
                <Icon size={22} />
                <span className="text-xs font-semibold">{action.label}</span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;
