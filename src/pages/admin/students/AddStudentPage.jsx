import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowLeft, GraduationCap, User, Phone, Home, BookOpen, Bus, Save } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';

const SECTIONS = ['A', 'B', 'C', 'D'];
const CLASSES = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

const TABS = ['Personal', 'Contact & Parent', 'Academic', 'Transport'];

const FormGroup = ({ label, required, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const FormInput = React.forwardRef(({ error, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'}`}
  />
));
FormInput.displayName = 'FormInput';

const FormSelect = React.forwardRef(({ error, children, ...props }, ref) => (
  <select
    ref={ref}
    {...props}
    className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white ${error ? 'border-red-300' : 'border-slate-200'}`}
  >
    {children}
  </select>
));
FormSelect.displayName = 'FormSelect';

const AddStudentPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Personal');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // Will call studentApi.create(data) when backend is ready
    console.log('Add student:', data);
    navigate('/admin/students');
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Add New Student"
        subtitle="Fill in the details to enroll a new student"
        icon={<GraduationCap size={20} className="text-indigo-600" />}
        actions={
          <button onClick={() => navigate('/admin/students')} className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50">
            <ArrowLeft size={15} /> Back
          </button>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Tab Nav */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 card-shadow mb-5 overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl card-shadow p-6">
          {activeTab === 'Personal' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormGroup label="First Name" required error={errors.firstName?.message}>
                <FormInput {...register('firstName', { required: 'First name is required' })} placeholder="First name" error={errors.firstName} />
              </FormGroup>
              <FormGroup label="Last Name" required error={errors.lastName?.message}>
                <FormInput {...register('lastName', { required: 'Last name is required' })} placeholder="Last name" error={errors.lastName} />
              </FormGroup>
              <FormGroup label="Gender" required error={errors.gender?.message}>
                <FormSelect {...register('gender', { required: 'Gender is required' })} error={errors.gender}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </FormSelect>
              </FormGroup>
              <FormGroup label="Date of Birth" required error={errors.dob?.message}>
                <FormInput type="date" {...register('dob', { required: 'DOB is required' })} error={errors.dob} />
              </FormGroup>
              <FormGroup label="Blood Group" error={errors.blood?.message}>
                <FormSelect {...register('blood')}>
                  <option value="">Select blood group</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => <option key={b}>{b}</option>)}
                </FormSelect>
              </FormGroup>
              <FormGroup label="Admission Date" required error={errors.admissionDate?.message}>
                <FormInput type="date" {...register('admissionDate', { required: 'Admission date is required' })} error={errors.admissionDate} />
              </FormGroup>
            </div>
          )}

          {activeTab === 'Contact & Parent' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormGroup label="Student Phone" error={errors.phone?.message}>
                <FormInput {...register('phone')} placeholder="Phone number" type="tel" error={errors.phone} />
              </FormGroup>
              <FormGroup label="Student Email" error={errors.email?.message}>
                <FormInput {...register('email')} placeholder="student@example.com" type="email" error={errors.email} />
              </FormGroup>
              <div className="sm:col-span-2">
                <FormGroup label="Address" error={errors.address?.message}>
                  <textarea {...register('address')} rows={2} placeholder="Full address..." className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none" />
                </FormGroup>
              </div>
              <FormGroup label="Parent/Guardian Name" required error={errors.parentName?.message}>
                <FormInput {...register('parentName', { required: 'Parent name is required' })} placeholder="Parent full name" error={errors.parentName} />
              </FormGroup>
              <FormGroup label="Relationship" error={errors.parentRelation?.message}>
                <FormSelect {...register('parentRelation')}>
                  <option value="">Select</option>
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Guardian</option>
                </FormSelect>
              </FormGroup>
              <FormGroup label="Parent Phone" required error={errors.parentPhone?.message}>
                <FormInput {...register('parentPhone', { required: 'Parent phone is required' })} placeholder="Parent phone" type="tel" error={errors.parentPhone} />
              </FormGroup>
              <FormGroup label="Parent Email" error={errors.parentEmail?.message}>
                <FormInput {...register('parentEmail')} placeholder="parent@example.com" type="email" error={errors.parentEmail} />
              </FormGroup>
            </div>
          )}

          {activeTab === 'Academic' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormGroup label="Class" required error={errors.class?.message}>
                <FormSelect {...register('class', { required: 'Class is required' })} error={errors.class}>
                  <option value="">Select class</option>
                  {CLASSES.map(c => <option key={c}>{c}</option>)}
                </FormSelect>
              </FormGroup>
              <FormGroup label="Section" required error={errors.section?.message}>
                <FormSelect {...register('section', { required: 'Section is required' })} error={errors.section}>
                  <option value="">Select section</option>
                  {SECTIONS.map(s => <option key={s}>{s}</option>)}
                </FormSelect>
              </FormGroup>
              <FormGroup label="Roll Number" error={errors.rollNo?.message}>
                <FormInput {...register('rollNo')} placeholder="e.g. 001" error={errors.rollNo} />
              </FormGroup>
              <FormGroup label="Previous School" error={errors.prevSchool?.message}>
                <FormInput {...register('prevSchool')} placeholder="Previous school name" error={errors.prevSchool} />
              </FormGroup>
            </div>
          )}

          {activeTab === 'Transport' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormGroup label="Transport Mode" error={errors.transport?.message}>
                <FormSelect {...register('transport')}>
                  <option value="">Select</option>
                  <option>School Bus</option>
                  <option>Own Arrangement</option>
                </FormSelect>
              </FormGroup>
              <FormGroup label="Bus Route" error={errors.busRoute?.message}>
                <FormInput {...register('busRoute')} placeholder="Bus route number" error={errors.busRoute} />
              </FormGroup>
              <FormGroup label="Bus Stop" error={errors.busStop?.message}>
                <FormInput {...register('busStop')} placeholder="Pickup stop" error={errors.busStop} />
              </FormGroup>
            </div>
          )}
        </motion.div>

        {/* Footer Actions */}
        <div className="flex justify-between mt-5">
          <button type="button" onClick={() => navigate('/admin/students')} className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <div className="flex gap-3">
            {activeTab !== TABS[TABS.length - 1] && (
              <button type="button" onClick={() => setActiveTab(TABS[TABS.indexOf(activeTab) + 1])} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium text-slate-700 transition-colors">
                Next →
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-70"
            >
              <Save size={15} /> {isSubmitting ? 'Saving...' : 'Save Student'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStudentPage;
