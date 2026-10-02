import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';

const ParentAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  const records = [
    { date: '2026-10-02', status: 'Present', remarks: 'On time' },
    { date: '2026-10-01', status: 'Present', remarks: 'On time' },
    { date: '2026-09-30', status: 'Present', remarks: 'On time' },
    { date: '2026-09-29', status: 'Late', remarks: 'Arrived 15 mins late' },
    { date: '2026-09-28', status: 'Present', remarks: 'On time' },
    { date: '2026-09-25', status: 'Absent', remarks: 'Medical leave submitted' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Child Attendance History"
        subtitle="Track daily attendance logs, presence rates, and tardiness reports"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-400">Total Working Days</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">22 Days</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-emerald-600">Present Days</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">20 Days</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-amber-600">Late Days</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">1 Day</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-red-600">Absent Days</p>
          <p className="text-2xl font-bold text-red-700 mt-1">1 Day</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
      >
        <h3 className="text-base font-bold text-slate-800">Daily Attendance Log</h3>
        <div className="space-y-2">
          {records.map((rec, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-sm">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-slate-400" />
                <span className="font-semibold text-slate-800">{rec.date}</span>
                <span className="text-xs text-slate-400">({rec.remarks})</span>
              </div>
              <Badge variant={rec.status === 'Present' ? 'emerald' : rec.status === 'Late' ? 'amber' : 'red'}>
                {rec.status}
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ParentAttendance;
