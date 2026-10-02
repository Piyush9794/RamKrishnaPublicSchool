import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, UserCheck, GraduationCap, BookOpen, TrendingUp,
  DollarSign, AlertCircle, Calendar, Megaphone, Clock,
  ArrowUpRight, CheckCircle2, XCircle, Minus
} from 'lucide-react';

const statCards = [
  { label: 'Total Students', value: '2,458', change: '+12', trend: 'up', icon: GraduationCap, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { label: 'Total Teachers', value: '142', change: '+3', trend: 'up', icon: UserCheck, color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50', iconColor: 'text-violet-600' },
  { label: 'Total Parents', value: '1,892', change: '+8', trend: 'up', icon: Users, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { label: 'Active Classes', value: '84', change: '0', trend: 'neutral', icon: BookOpen, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', iconColor: 'text-amber-600' },
];

const attendanceStats = [
  { label: 'Present', value: '2,156', pct: '87.7%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Absent', value: '248', pct: '10.1%', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Late', value: '54', pct: '2.2%', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
];

const recentActivities = [
  { text: 'New student Aarav Sharma enrolled in Class 9-A', time: '5 min ago', type: 'student' },
  { text: 'Fee payment ₹12,500 received from Meera Patel', time: '22 min ago', type: 'fee' },
  { text: 'Notice "Sports Day 2026" published by Admin', time: '1 hr ago', type: 'notice' },
  { text: 'Teacher Rajesh Kumar marked attendance', time: '2 hr ago', type: 'teacher' },
  { text: 'Exam "Mid-Term Mathematics" scheduled for Class 10', time: '3 hr ago', type: 'exam' },
];

const upcomingExams = [
  { name: 'Mid-Term Mathematics', class: 'Class 10', date: 'Oct 5, 2026' },
  { name: 'Science Quiz', class: 'Class 8', date: 'Oct 7, 2026' },
  { name: 'English Literature', class: 'Class 12', date: 'Oct 10, 2026' },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.label} variants={item} className="bg-white rounded-2xl p-5 card-shadow hover:card-shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center`}>
                  <Icon size={22} className={card.iconColor} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${card.trend === 'up' ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {card.trend === 'up' && <ArrowUpRight size={14} />}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{card.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Attendance */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-5 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Today's Attendance</h3>
            <span className="text-xs text-slate-500">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
          </div>
          {/* Donut visual */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="87.7 12.3" strokeLinecap="round" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f87171" strokeWidth="3" strokeDasharray="10.1 89.9" strokeDashoffset="-87.7" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-slate-900">87.7%</span>
              <span className="text-xs text-slate-500">Present</span>
            </div>
          </div>
          <div className="space-y-2">
            {attendanceStats.map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <Icon size={14} className={stat.color} />
                    </span>
                    <span className="text-sm text-slate-600">{stat.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-slate-900">{stat.value}</span>
                    <span className="text-xs text-slate-400 ml-1">({stat.pct})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Fee Overview */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl p-5 card-shadow">
          <h3 className="font-semibold text-slate-900 mb-4">Fee Collection</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-600">Collected</span>
                <span className="font-semibold text-slate-900">₹18,42,500</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full"><div className="h-2 bg-emerald-500 rounded-full" style={{ width: '73%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-600">Pending</span>
                <span className="font-semibold text-amber-600">₹5,12,000</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full"><div className="h-2 bg-amber-400 rounded-full" style={{ width: '20%' }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-600">Overdue</span>
                <span className="font-semibold text-red-500">₹1,85,500</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full"><div className="h-2 bg-red-400 rounded-full" style={{ width: '7%' }} /></div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
            <div>
              <p className="text-xs text-slate-500">Total Expected</p>
              <p className="font-bold text-slate-900">₹25,40,000</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Collection Rate</p>
              <p className="font-bold text-emerald-600">72.5%</p>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Exams */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-5 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Upcoming Exams</h3>
            <Calendar size={16} className="text-slate-400" />
          </div>
          <div className="space-y-3">
            {upcomingExams.map((exam, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-indigo-600">{i + 1}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{exam.name}</p>
                  <p className="text-xs text-slate-500">{exam.class} · {exam.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl p-5 card-shadow">
        <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivities.map((act, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
              <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0 mt-2" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">{act.text}</p>
                <p className="text-xs text-slate-400 mt-0.5">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
