import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, MapPin, Search } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Pagination from '../../../components/common/Pagination';

const INITIAL_TEACHERS = [
  { id: 'TCH100', name: 'Sarah Jenkins', employeeId: 'EMP2000', status: 'Pending', checkIn: '—', locationName: '—', coordinates: '—', accuracy: '—' },
  { id: 'TCH101', name: 'Suresh Kumar', employeeId: 'EMP2001', status: 'Pending', checkIn: '—', locationName: '—', coordinates: '—', accuracy: '—' },
  { id: 'TCH102', name: 'Priti Agarwal', employeeId: 'EMP2002', status: 'Pending', checkIn: '—', locationName: '—', coordinates: '—', accuracy: '—' },
  { id: 'TCH103', name: 'Mohammed Ali', employeeId: 'EMP2003', status: 'Pending', checkIn: '—', locationName: '—', coordinates: '—', accuracy: '—' },
  { id: 'TCH104', name: 'Sunita Verma', employeeId: 'EMP2004', status: 'Pending', checkIn: '—', locationName: '—', coordinates: '—', accuracy: '—' },
  { id: 'TCH105', name: 'Deepak Jain', employeeId: 'EMP2005', status: 'Pending', checkIn: '—', locationName: '—', coordinates: '—', accuracy: '—' },
];

const statusConfig = {
  Present: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
  Absent: { color: 'text-red-500', bg: 'bg-red-50', icon: XCircle },
  Late: { color: 'text-amber-500', bg: 'bg-amber-50', icon: Clock },
  'Half Day': { color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Clock },
  Pending: { color: 'text-slate-400', bg: 'bg-slate-100', icon: Clock },
};

const TeacherAttendancePage = () => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const pageSize = 10;

  // Load real location-permission marked teacher attendance from storage / API
  useEffect(() => {
    const todayKey = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`rkps_teacher_attendance_${todayKey}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTeachers((prev) =>
          prev.map((t) => {
            // Update logged in teacher record with live permission-based location
            if (t.name === 'Sarah Jenkins' || t.employeeId === 'EMP2000') {
              return {
                ...t,
                status: parsed.status || 'Present',
                checkIn: parsed.markedAt || 'Just Now',
                locationName: parsed.locationName || 'Live GPS Location',
                coordinates: parsed.latitude ? `${parsed.latitude.toFixed(6)}°N, ${parsed.longitude.toFixed(6)}°E` : '—',
                accuracy: parsed.accuracy ? `±${Math.round(parsed.accuracy)}m` : '—',
              };
            }
            return t;
          })
        );
      } catch {
        // ignore parse error
      }
    }
  }, []);

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.employeeId.includes(search) ||
      t.locationName.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totals = {
    Present: teachers.filter((t) => t.status === 'Present' || t.status === 'Half Day').length,
    Pending: teachers.filter((t) => t.status === 'Pending').length,
    Absent: teachers.filter((t) => t.status === 'Absent').length,
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Teacher Attendance"
        subtitle="Teacher check-in logs based on live browser location permission & GPS reverse geocoding"
      />

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {Object.entries(totals).map(([status, count]) => {
          const cfg = statusConfig[status] || statusConfig.Pending;
          const Icon = cfg.icon;
          return (
            <div key={status} className={`rounded-2xl p-4 text-center ${cfg.bg}`}>
              <Icon size={24} className={`mx-auto mb-2 ${cfg.color}`} />
              <p className="text-2xl font-bold text-slate-900">{count}</p>
              <p className="text-xs sm:text-sm text-slate-600">{status}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-4 card-shadow flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teacher name, ID or place name..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        />
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Employee ID', 'Name', 'Status', 'Check-In', 'Detected Place / Address', 'GPS Coordinates', 'Accuracy'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paged.map((t, i) => {
                const cfg = statusConfig[t.status] || statusConfig.Pending;
                const Icon = cfg.icon;
                return (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{t.employeeId}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{t.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${cfg.color}`}>
                        <Icon size={14} /> {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{t.checkIn}</td>
                    <td className="px-4 py-3 font-medium text-indigo-900">
                      {t.locationName !== '—' ? (
                        <span className="flex items-center gap-1 text-xs text-indigo-700 font-semibold">
                          <MapPin size={13} className="text-indigo-600 shrink-0" /> {t.locationName}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs italic">No location marked</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{t.coordinates}</td>
                    <td className="px-4 py-3 text-slate-600">{t.accuracy}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendancePage;
