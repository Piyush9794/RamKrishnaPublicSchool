import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, User, Phone, Mail, MapPin, BookOpen,
  CalendarDays, CreditCard, ClipboardList, FileText
} from 'lucide-react';
import Badge from '../../../components/common/Badge';
import PageHeader from '../../../components/common/PageHeader';

const MOCK_STUDENT = {
  id: 'STU1000',
  name: 'Aarav Sharma',
  gender: 'Male',
  dob: '2010-03-15',
  blood: 'O+',
  class: 'Class 9',
  section: 'A',
  rollNo: '001',
  admissionDate: '2022-04-01',
  phone: '9876543210',
  email: 'aarav@example.com',
  address: '123, MG Road, Lucknow, UP - 226001',
  parentName: 'Rajesh Sharma',
  parentPhone: '9812345678',
  parentEmail: 'rajesh@example.com',
  status: 'active',
  transport: 'Bus Route 3 — Stop: MG Road',
  fees: { paid: 45000, pending: 15000 },
  attendance: '88.5%',
};

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 py-2.5 border-b border-slate-50 last:border-0">
    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide w-32 shrink-0">{label}</span>
    <span className="text-sm text-slate-800">{value || '—'}</span>
  </div>
);

const StudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const s = MOCK_STUDENT;

  const tabs = [
    { label: 'Personal', icon: User },
    { label: 'Academic', icon: BookOpen },
    { label: 'Fees', icon: CreditCard },
    { label: 'Attendance', icon: ClipboardList },
    { label: 'Documents', icon: FileText },
  ];
  const [activeTab, setActiveTab] = React.useState('Personal');

  return (
    <div className="space-y-5">
      <PageHeader
        title={s.name}
        subtitle={`${s.class}-${s.section} · Roll No. ${s.rollNo}`}
        icon={<User size={20} className="text-indigo-600" />}
        actions={
          <button onClick={() => navigate('/admin/students')} className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">
            <ArrowLeft size={15} /> Back
          </button>
        }
      />

      {/* Profile Card */}
      <div className="bg-white rounded-2xl card-shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-3xl font-bold shrink-0">
            {s.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900">{s.name}</h2>
              <Badge variant={s.status === 'active' ? 'success' : 'danger'}>{s.status}</Badge>
            </div>
            <p className="text-slate-500 text-sm mt-1">{s.id} · {s.gender} · DOB: {s.dob}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
              <span className="flex items-center gap-1.5"><Phone size={13} />{s.phone}</span>
              <span className="flex items-center gap-1.5"><Mail size={13} />{s.email}</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} />{s.address}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center shrink-0">
            <div className="bg-emerald-50 rounded-xl px-4 py-3">
              <p className="text-xl font-bold text-emerald-700">{s.attendance}</p>
              <p className="text-xs text-emerald-600">Attendance</p>
            </div>
            <div className="bg-amber-50 rounded-xl px-4 py-3">
              <p className="text-xl font-bold text-amber-700">₹{(s.fees.pending / 1000).toFixed(0)}K</p>
              <p className="text-xs text-amber-600">Pending Fee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-2xl p-1.5 card-shadow overflow-x-auto no-scrollbar">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.label ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              <Icon size={15} />{tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl card-shadow p-6">
        {activeTab === 'Personal' && (
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Personal Information</h3>
            <InfoRow label="Full Name" value={s.name} />
            <InfoRow label="Gender" value={s.gender} />
            <InfoRow label="Date of Birth" value={s.dob} />
            <InfoRow label="Blood Group" value={s.blood} />
            <InfoRow label="Phone" value={s.phone} />
            <InfoRow label="Email" value={s.email} />
            <InfoRow label="Address" value={s.address} />
            <h3 className="font-semibold text-slate-900 mt-6 mb-3">Parent / Guardian</h3>
            <InfoRow label="Name" value={s.parentName} />
            <InfoRow label="Phone" value={s.parentPhone} />
            <InfoRow label="Email" value={s.parentEmail} />
          </div>
        )}
        {activeTab === 'Academic' && (
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Academic Details</h3>
            <InfoRow label="Class" value={s.class} />
            <InfoRow label="Section" value={s.section} />
            <InfoRow label="Roll No." value={s.rollNo} />
            <InfoRow label="Admission Date" value={s.admissionDate} />
            <InfoRow label="Transport" value={s.transport} />
          </div>
        )}
        {activeTab === 'Fees' && (
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Fee Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-emerald-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-700">₹{s.fees.paid.toLocaleString()}</p>
                <p className="text-sm text-emerald-600 mt-1">Paid</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-amber-700">₹{s.fees.pending.toLocaleString()}</p>
                <p className="text-sm text-amber-600 mt-1">Pending</p>
              </div>
            </div>
            <p className="text-sm text-slate-500">Full fee history available in the Fees module.</p>
          </div>
        )}
        {activeTab === 'Attendance' && (
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Attendance Overview</h3>
            <div className="text-center py-8">
              <p className="text-5xl font-bold text-indigo-600">{s.attendance}</p>
              <p className="text-slate-500 mt-2">Overall Attendance Rate</p>
            </div>
          </div>
        )}
        {activeTab === 'Documents' && (
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Documents</h3>
            <p className="text-sm text-slate-500">No documents uploaded yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StudentDetailPage;
