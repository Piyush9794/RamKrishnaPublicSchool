import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, FileText, Shield, Edit3, Save } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import toast from '../../utils/toast';

const TeacherProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@school.edu',
    phone: '+1 (555) 234-5678',
    employeeId: 'TCH-2024-042',
    department: 'Mathematics & Computer Science',
    designation: 'Senior Mathematics Teacher',
    joiningDate: '2020-08-15',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    experience: '8 Years',
    address: '742 Evergreen Terrace, Springfield',
    bio: 'Passionate about modern algebra and interactive learning methodologies. Leading the school STEM club.',
    assignedClasses: [
      { class: 'Class 10', section: 'A', subject: 'Mathematics', totalStudents: 38 },
      { class: 'Class 10', section: 'B', subject: 'Mathematics', totalStudents: 40 },
      { class: 'Class 12', section: 'A', subject: 'Advanced Calculus', totalStudents: 32 },
    ],
    documents: [
      { name: 'Master_Degree_Certificate.pdf', type: 'Qualification', size: '2.4 MB', date: '2020-08-10' },
      { name: 'BEd_Certification.pdf', type: 'Qualification', size: '1.8 MB', date: '2020-08-10' },
      { name: 'National_ID_Passport.pdf', type: 'ID Proof', size: '1.2 MB', date: '2020-08-10' },
    ]
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="View and manage your professional teacher profile and information"
        action={
          <Button
            variant={isEditing ? 'primary' : 'outline'}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            icon={isEditing ? <Save size={16} /> : <Edit3 size={16} />}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col items-center text-center"
        >
          <div className="relative mb-4">
            <Avatar name={profile.name} size="xl" />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">{profile.name}</h2>
          <p className="text-sm font-medium text-indigo-600 mt-0.5">{profile.designation}</p>
          <p className="text-xs text-slate-400 mt-1">{profile.department}</p>
          <Badge variant="indigo" className="mt-3">{profile.employeeId}</Badge>

          <div className="w-full border-t border-slate-100 my-5" />

          <div className="w-full space-y-3 text-left text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-slate-400 shrink-0" />
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-slate-400 shrink-0" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-slate-400 shrink-0" />
              <span>Joined: {new Date(profile.joiningDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-slate-400 shrink-0" />
              <span className="truncate">{profile.address}</span>
            </div>
          </div>
        </motion.div>

        {/* Details and Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Qualifications & Overview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4"
          >
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Award size={18} className="text-indigo-600" />
              Qualifications & Background
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Highest Qualification</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">{profile.qualification}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Experience</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">{profile.experience}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Biography / Note</p>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
                  rows={3}
                />
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  {profile.bio}
                </p>
              )}
            </div>
          </motion.div>

          {/* Assigned Classes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs"
          >
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
              <BookOpen size={18} className="text-indigo-600" />
              Assigned Classes & Subjects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.assignedClasses.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 hover:bg-indigo-50/70 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-700">{item.class} - {item.section}</span>
                    <Badge variant="indigo" size="xs">{item.totalStudents} Students</Badge>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{item.subject}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Documents */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs"
          >
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
              <FileText size={18} className="text-indigo-600" />
              Uploaded Qualification & Verification Documents
            </h3>

            <div className="space-y-2">
              {profile.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                      <p className="text-xs text-slate-400">{doc.type} • {doc.size} • Uploaded {doc.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
