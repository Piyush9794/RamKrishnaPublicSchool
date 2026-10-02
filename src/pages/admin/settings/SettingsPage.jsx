import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, School, Bell, Lock, Globe, Palette, Save } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';

const TABS = ['School Info', 'Notifications', 'Security', 'Appearance'];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('School Info');
  const [schoolInfo, setSchoolInfo] = useState({
    name: 'Ramakant Public School', code: 'RKPS', address: 'MG Road, Lucknow, UP - 226001',
    phone: '0522-1234567', email: 'info@rkps.edu.in', website: 'www.rkps.edu.in',
    principalName: 'Dr. Anil Kumar', academicYear: '2025-2026',
  });

  const handleChange = (field, value) => setSchoolInfo(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-5">
      <PageHeader title="Settings" subtitle="System and school configuration" icon={<Settings size={20} className="text-indigo-600" />} />

      <div className="flex gap-1 bg-white rounded-2xl p-1.5 card-shadow overflow-x-auto no-scrollbar">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
            {tab}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl card-shadow p-6">
        {activeTab === 'School Info' && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <School size={20} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">School Information</h3>
                <p className="text-xs text-slate-500">Basic school details and contact</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'School Name', field: 'name' },
                { label: 'School Code', field: 'code' },
                { label: 'Phone', field: 'phone' },
                { label: 'Email', field: 'email' },
                { label: 'Website', field: 'website' },
                { label: 'Principal Name', field: 'principalName' },
                { label: 'Current Academic Year', field: 'academicYear' },
              ].map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                  <input
                    value={schoolInfo[field]}
                    onChange={e => handleChange(field, e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                <textarea
                  value={schoolInfo.address}
                  onChange={e => handleChange('address', e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors">
                <Save size={15} /> Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <Bell size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Notification Settings</h3>
                <p className="text-xs text-slate-500">Configure notification triggers</p>
              </div>
            </div>
            <div className="space-y-3">
              {['Fee reminders', 'Attendance alerts', 'Exam notifications', 'Result publishing', 'Notice broadcasts', 'Leave updates'].map(item => (
                <label key={item} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer">
                  <span className="text-sm text-slate-700">{item}</span>
                  <div className="w-10 h-5 bg-indigo-500 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Security' && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <Lock size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Security Settings</h3>
                <p className="text-xs text-slate-500">Password policies and session management</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Min Password Length</label>
                <input type="number" defaultValue={8} min={6} max={20} className="w-full sm:w-48 px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Session Timeout (minutes)</label>
                <input type="number" defaultValue={60} min={15} max={480} className="w-full sm:w-48 px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
              <div className="flex justify-end mt-5">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors">
                  <Save size={15} /> Save Security Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Appearance' && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                <Palette size={20} className="text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Appearance</h3>
                <p className="text-xs text-slate-500">Theme and display preferences</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Indigo', 'Blue', 'Emerald', 'Rose'].map(color => (
                <button key={color} className={`p-4 border-2 rounded-xl text-sm font-medium transition-all ${color === 'Indigo' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-100 hover:border-slate-300'}`}>
                  {color}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">More appearance options coming soon.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SettingsPage;
