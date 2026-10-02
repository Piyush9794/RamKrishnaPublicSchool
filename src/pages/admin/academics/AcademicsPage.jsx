import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, BookOpen, Users, Layers, BookMarked, Edit2, Trash2 } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';

const SESSIONS = [{ id: 1, name: '2025-2026', active: true }, { id: 2, name: '2024-2025', active: false }];
const CLASSES = [
  { id: 1, name: 'Class 6', sections: ['A', 'B', 'C'], students: 120, classTeacher: 'Suresh Kumar' },
  { id: 2, name: 'Class 7', sections: ['A', 'B', 'C'], students: 115, classTeacher: 'Priti Agarwal' },
  { id: 3, name: 'Class 8', sections: ['A', 'B'], students: 80, classTeacher: 'Mohammed Ali' },
  { id: 4, name: 'Class 9', sections: ['A', 'B', 'C'], students: 130, classTeacher: 'Sunita Verma' },
  { id: 5, name: 'Class 10', sections: ['A', 'B', 'C'], students: 125, classTeacher: 'Deepak Jain' },
  { id: 6, name: 'Class 11', sections: ['A', 'B'], students: 90, classTeacher: 'Kavita Rao' },
  { id: 7, name: 'Class 12', sections: ['A', 'B'], students: 88, classTeacher: 'Ramesh Gupta' },
];
const SUBJECTS = [
  { id: 1, name: 'Mathematics', code: 'MATH', classes: 'All', type: 'Core' },
  { id: 2, name: 'Science', code: 'SCI', classes: 'Class 6-8', type: 'Core' },
  { id: 3, name: 'Physics', code: 'PHY', classes: 'Class 9-12', type: 'Core' },
  { id: 4, name: 'Chemistry', code: 'CHEM', classes: 'Class 9-12', type: 'Core' },
  { id: 5, name: 'Biology', code: 'BIO', classes: 'Class 9-12', type: 'Core' },
  { id: 6, name: 'English', code: 'ENG', classes: 'All', type: 'Core' },
  { id: 7, name: 'Hindi', code: 'HIN', classes: 'All', type: 'Core' },
  { id: 8, name: 'Social Science', code: 'SST', classes: 'Class 6-10', type: 'Core' },
  { id: 9, name: 'Computer Science', code: 'CS', classes: 'Class 9-12', type: 'Elective' },
];

const AcademicsPage = () => {
  const [activeTab, setActiveTab] = useState('Classes');
  const tabs = ['Classes', 'Sections', 'Subjects', 'Sessions'];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Academic Management"
        subtitle="Manage sessions, classes, sections and subjects"
        icon={<BookOpen size={20} className="text-indigo-600" />}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} /> Add New
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-2xl p-1.5 card-shadow overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        {activeTab === 'Classes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CLASSES.map(cls => (
              <div key={cls.id} className="bg-white rounded-2xl card-shadow p-5 hover:card-shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <BookOpen size={20} className="text-indigo-600" />
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"><Edit2 size={14} /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{cls.name}</h3>
                <p className="text-sm text-slate-500 mt-1">Teacher: {cls.classTeacher}</p>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Layers size={12} /> {cls.sections.length} sections
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Users size={12} /> {cls.students} students
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {cls.sections.map(sec => (
                    <span key={sec} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">{sec}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Subjects' && (
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Subject Name', 'Code', 'Applicable Classes', 'Type', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {SUBJECTS.map(sub => (
                    <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">{sub.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500 bg-slate-50 rounded">{sub.code}</td>
                      <td className="px-4 py-3 text-slate-600">{sub.classes}</td>
                      <td className="px-4 py-3">
                        <Badge variant={sub.type === 'Core' ? 'primary' : 'warning'} size="sm">{sub.type}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><Edit2 size={14} /></button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-400"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Sessions' && (
          <div className="space-y-3">
            {SESSIONS.map(session => (
              <div key={session.id} className="bg-white rounded-2xl card-shadow p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <BookMarked size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{session.name}</p>
                    <p className="text-xs text-slate-500">Academic Session</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={session.active ? 'success' : 'secondary'}>{session.active ? 'Active' : 'Past'}</Badge>
                  <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><Edit2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Sections' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLASSES.flatMap(cls =>
              cls.sections.map(sec => ({
                className: cls.name,
                section: sec,
                classTeacher: cls.classTeacher,
                students: Math.floor(cls.students / cls.sections.length),
              }))
            ).map((item, i) => (
              <div key={i} className="bg-white rounded-2xl card-shadow p-4 flex items-center gap-3 hover:card-shadow-md transition-shadow">
                <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-lg font-bold text-violet-700 shrink-0">
                  {item.section}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900">{item.className} — Section {item.section}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Teacher: {item.classTeacher}</p>
                  <p className="text-xs text-slate-500">{item.students} students</p>
                </div>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 shrink-0"><Edit2 size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AcademicsPage;
