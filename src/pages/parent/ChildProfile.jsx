import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, BookOpen, Award, FileText, Bus, Shield } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';

const ChildProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('academic');

  const student = {
    id: id || 'STU-101',
    name: 'Alexander Wright',
    class: 'Class 10-A',
    rollNo: '101',
    dob: '2010-04-12',
    bloodGroup: 'O+',
    admissionNo: 'ADM-2020-891',
    classTeacher: 'Sarah Jenkins',
    busStop: 'Stop 14 - Sector 12 Park',
    busRoute: 'Route 4',
    attendancePct: '94.5%',
    subjects: [
      { name: 'Mathematics', teacher: 'Sarah Jenkins', grade: 'A' },
      { name: 'Physics', teacher: 'Dr. Alan Vance', grade: 'A+' },
      { name: 'Chemistry', teacher: 'Maria Garcia', grade: 'A' },
      { name: 'English Literature', teacher: 'David Miller', grade: 'B+' },
    ],
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${student.name}'s Profile`}
        subtitle="Detailed student record, academic performance, and school services"
      />

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
        <Avatar name={student.name} size="xl" />
        <div className="space-y-1 text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
            <Badge variant="emerald">{student.class}</Badge>
            <Badge variant="indigo">Admission #{student.admissionNo}</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Roll No: <strong className="text-slate-600 font-mono">{student.rollNo}</strong> • DOB: <strong className="text-slate-600">{student.dob}</strong> • Blood Group: <strong className="text-slate-600">{student.bloodGroup}</strong>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {['academic', 'attendance', 'transport'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            {tab} Overview
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'academic' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4"
        >
          <h3 className="text-base font-bold text-slate-800">Enrolled Subjects & Teachers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.subjects.map((sub, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{sub.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Teacher: {sub.teacher}</p>
                </div>
                <Badge variant="emerald">Grade: {sub.grade}</Badge>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'attendance' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4"
        >
          <h3 className="text-base font-bold text-slate-800">Attendance Summary</h3>
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800 flex items-center justify-between">
            <span>Overall Attendance Rate</span>
            <span className="text-xl font-bold">{student.attendancePct}</span>
          </div>
        </motion.div>
      )}

      {activeTab === 'transport' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4"
        >
          <h3 className="text-base font-bold text-slate-800">Transport & Bus Allocation</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400">Assigned Bus Route</span>
              <p className="font-bold text-slate-800 mt-1">{student.busRoute}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400">Designated Stop</span>
              <p className="font-bold text-slate-800 mt-1">{student.busStop}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChildProfile;
