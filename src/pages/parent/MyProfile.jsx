import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Users, Edit3, Save, Shield } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import toast from '../../utils/toast';

const ParentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Robert Wright',
    email: 'robert.wright@email.com',
    phone: '+1 (555) 890-1234',
    address: '142 Maplewood Avenue, Springfield',
    occupation: 'Senior Software Engineer',
    emergencyContact: '+1 (555) 999-0000',
    linkedChildren: [
      { name: 'Alexander Wright', class: 'Class 10-A', rollNo: '101' },
      { name: 'Emily Wright', class: 'Class 5-B', rollNo: '508' },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Parent profile updated!');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        subtitle="Manage your contact details, emergency information, and linked children"
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col items-center text-center"
        >
          <Avatar name={profile.name} size="xl" />
          <h2 className="text-xl font-bold text-slate-800 mt-4">{profile.name}</h2>
          <p className="text-sm text-slate-500">{profile.occupation}</p>
          <Badge variant="emerald" className="mt-3">Parent / Guardian</Badge>

          <div className="w-full border-t border-slate-100 my-5" />

          <div className="w-full space-y-3 text-left text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-slate-400 shrink-0" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-slate-400 shrink-0" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-slate-400 shrink-0" />
              <span>{profile.address}</span>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4"
          >
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Users size={18} className="text-emerald-600" />
              Linked Children
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.linkedChildren.map((child, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{child.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{child.class} • Roll #{child.rollNo}</p>
                  </div>
                  <Badge variant="emerald">Authorized</Badge>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4"
          >
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Shield size={18} className="text-emerald-600" />
              Emergency & Guardian Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase">Emergency Contact</p>
                <p className="text-sm font-bold text-slate-800 mt-1">{profile.emergencyContact}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-400 uppercase">Residential Address</p>
                <p className="text-sm font-bold text-slate-800 mt-1">{profile.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;
