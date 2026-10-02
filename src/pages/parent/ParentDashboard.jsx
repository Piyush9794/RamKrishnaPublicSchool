import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, Calendar, BookMarked, DollarSign, Award, CheckCircle2,
  ChevronRight, Users, Bell, Bus, BookOpen, Download
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const CHILDREN = [
  {
    id: 'STU-101',
    name: 'Alexander Wright',
    class: 'Class 10-A',
    rollNo: '101',
    avatar: '',
    attendancePct: 94.5,
    pendingFees: '$450',
    rank: '3rd',
    gpa: '3.8 / 4.0',
    classTeacher: 'Sarah Jenkins',
    busRoute: 'Route 4 - Sector 12',
  },
  {
    id: 'STU-102',
    name: 'Emily Wright',
    class: 'Class 5-B',
    rollNo: '508',
    avatar: '',
    attendancePct: 98.0,
    pendingFees: '$0',
    rank: '1st',
    gpa: '4.0 / 4.0',
    classTeacher: 'Michael Chang',
    busRoute: 'Route 4 - Sector 12',
  },
];

const ParentDashboard = () => {
  const [selectedChildId, setSelectedChildId] = useState(CHILDREN[0].id);

  const child = CHILDREN.find((c) => c.id === selectedChildId) || CHILDREN[0];

  return (
    <div className="space-y-6">
      {/* Top Banner with Child Selector */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-emerald-200 text-xs font-bold uppercase tracking-wider">Parent Portal</p>
            <h1 className="text-2xl font-bold mt-1">Welcome back, Mr. Wright</h1>
            <p className="text-emerald-100/80 text-sm mt-0.5">Monitoring academic progress & school activities</p>
          </div>

          {/* Child Selector */}
          <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex items-center gap-2">
            <span className="text-xs font-semibold px-2 text-emerald-100">Select Child:</span>
            <div className="flex gap-1">
              {CHILDREN.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChildId(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    c.id === child.id
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {c.name} ({c.class})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Child Summary Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar name={child.name} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-800">{child.name}</h2>
              <Badge variant="emerald">{child.class}</Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Roll No: <strong className="text-slate-600 font-mono">{child.rollNo}</strong> • Class Teacher: <strong className="text-slate-600">{child.classTeacher}</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center w-full md:w-auto border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
          <div className="px-4 py-2 bg-emerald-50 rounded-xl">
            <p className="text-xs font-semibold text-emerald-600">Attendance</p>
            <p className="text-lg font-bold text-emerald-700">{child.attendancePct}%</p>
          </div>
          <div className="px-4 py-2 bg-indigo-50 rounded-xl">
            <p className="text-xs font-semibold text-indigo-600">Class Rank</p>
            <p className="text-lg font-bold text-indigo-700">{child.rank}</p>
          </div>
          <div className="px-4 py-2 bg-amber-50 rounded-xl">
            <p className="text-xs font-semibold text-amber-600">Pending Fees</p>
            <p className="text-lg font-bold text-amber-700">{child.pendingFees}</p>
          </div>
        </div>
      </div>

      {/* Grid of Key Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Calendar size={18} className="text-emerald-600" />
              Recent Attendance
            </h3>
            <span className="text-xs text-emerald-600 font-bold">This Month: 96%</span>
          </div>

          <div className="space-y-2">
            {[
              { date: 'Oct 02, 2026', status: 'Present', time: '08:15 AM' },
              { date: 'Oct 01, 2026', status: 'Present', time: '08:12 AM' },
              { date: 'Sep 30, 2026', status: 'Present', time: '08:18 AM' },
              { date: 'Sep 29, 2026', status: 'Late', time: '08:35 AM' },
            ].map((att, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs">
                <span className="font-semibold text-slate-700">{att.date}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">{att.time}</span>
                  <Badge variant={att.status === 'Present' ? 'emerald' : 'amber'}>
                    {att.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pending Homework & Assignments */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <BookMarked size={18} className="text-indigo-600" />
              Active Homework
            </h3>
            <Badge variant="indigo">2 Due Soon</Badge>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-700">Mathematics</span>
                <span className="text-slate-500">Due: Oct 05</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">Quadratic Equations Practice Set 4.2</p>
            </div>

            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-700">Science</span>
                <span className="text-slate-500">Due: Oct 06</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">Physics Motion Laws Experiment Report</p>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Exams & Notices */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Award size={18} className="text-violet-600" />
              Upcoming Exams
            </h3>
            <span className="text-xs font-bold text-violet-600">Mid-Term 2026</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Mathematics Paper</span>
                <span className="text-indigo-600 font-semibold">Oct 18</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">09:00 AM - 12:00 PM • Main Hall</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Physics & Chemistry</span>
                <span className="text-indigo-600 font-semibold">Oct 20</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">09:00 AM - 12:00 PM • Main Hall</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ParentDashboard;
