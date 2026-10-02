import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowLeft, UserCheck, Save, Mail, Phone, BookOpen, GraduationCap, MapPin, Award, DollarSign } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import toast from '../../../utils/toast';

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Computer Science & AI', 'English Literature', 'Hindi & Sanskrit',
  'Social Science', 'Physical Education', 'Arts & Craft'
];

const QUALIFICATIONS = ['B.Ed.', 'M.Ed.', 'M.Sc.', 'M.A.', 'Ph.D.', 'B.Tech / M.Tech'];
const DESIGNATIONS = ['Senior Faculty', 'Assistant Teacher', 'Head of Department (HOD)', 'Lab Instructor', 'Vice Principal'];
const CLASSES = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

const TABS = ['Personal Info', 'Employment & Subjects', 'Address & Contact'];

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
    className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors ${
      error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
    }`}
  />
));
FormInput.displayName = 'FormInput';

const FormSelect = React.forwardRef(({ error, children, ...props }, ref) => (
  <select
    ref={ref}
    {...props}
    className={`w-full px-3.5 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white ${
      error ? 'border-red-300' : 'border-slate-200'
    }`}
  >
    {children}
  </select>
));
FormSelect.displayName = 'FormSelect';

const AddTeacherPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Personal Info');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      employeeId: `EMP${Math.floor(2000 + Math.random() * 900)}`,
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'active',
    }
  });

  const onSubmit = async (data) => {
    try {
      // Create teacher record formatted for app storage & display
      const newTeacher = {
        id: `TCH${Math.floor(100 + Math.random() * 900)}`,
        name: `${data.firstName} ${data.lastName}`,
        employeeId: data.employeeId,
        subjects: data.primarySubject,
        classes: data.assignedClasses || 'Class 9-10',
        phone: data.phone,
        email: data.email,
        qualification: data.qualification,
        designation: data.designation,
        status: data.status || 'active',
        joinDate: data.joiningDate,
      };

      // Save to localStorage list for live admin view
      const existing = JSON.parse(localStorage.getItem('rkps_custom_teachers') || '[]');
      localStorage.setItem('rkps_custom_teachers', JSON.stringify([newTeacher, ...existing]));

      toast.success(`Teacher "${newTeacher.name}" added successfully!`);
      navigate('/admin/teachers');
    } catch (err) {
      toast.error('Failed to add teacher. Please try again.');
    }
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      <PageHeader
        title="Add New Teacher"
        subtitle="Fill in the information to onboard a new faculty member"
        icon={<UserCheck size={22} className="text-indigo-600" />}
        actions={
          <button
            onClick={() => navigate('/admin/teachers')}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Teachers
          </button>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Responsive Tab Bar */}
        <div className="flex gap-1.5 bg-white rounded-2xl p-1.5 card-shadow mb-5 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl card-shadow p-4 sm:p-6"
        >
          {activeTab === 'Personal Info' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormGroup label="First Name" required error={errors.firstName?.message}>
                <FormInput
                  {...register('firstName', { required: 'First name is required' })}
                  placeholder="e.g. Rajesh"
                  error={errors.firstName}
                />
              </FormGroup>

              <FormGroup label="Last Name" required error={errors.lastName?.message}>
                <FormInput
                  {...register('lastName', { required: 'Last name is required' })}
                  placeholder="e.g. Kumar"
                  error={errors.lastName}
                />
              </FormGroup>

              <FormGroup label="Email Address" required error={errors.email?.message}>
                <FormInput
                  type="email"
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                  })}
                  placeholder="rajesh.kumar@rkps.edu.in"
                  error={errors.email}
                />
              </FormGroup>

              <FormGroup label="Phone Number" required error={errors.phone?.message}>
                <FormInput
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  placeholder="+91 98765 43210"
                  error={errors.phone}
                />
              </FormGroup>

              <FormGroup label="Gender" required error={errors.gender?.message}>
                <FormSelect {...register('gender', { required: 'Gender is required' })} error={errors.gender}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </FormSelect>
              </FormGroup>

              <FormGroup label="Date of Birth" required error={errors.dob?.message}>
                <FormInput
                  type="date"
                  {...register('dob', { required: 'Date of birth is required' })}
                  error={errors.dob}
                />
              </FormGroup>
            </div>
          )}

          {activeTab === 'Employment & Subjects' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormGroup label="Employee ID" required error={errors.employeeId?.message}>
                <FormInput
                  {...register('employeeId', { required: 'Employee ID is required' })}
                  placeholder="e.g. EMP2026"
                  error={errors.employeeId}
                />
              </FormGroup>

              <FormGroup label="Designation" required error={errors.designation?.message}>
                <FormSelect {...register('designation', { required: 'Designation is required' })} error={errors.designation}>
                  <option value="">Select Designation</option>
                  {DESIGNATIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </FormSelect>
              </FormGroup>

              <FormGroup label="Highest Qualification" required error={errors.qualification?.message}>
                <FormSelect {...register('qualification', { required: 'Qualification is required' })} error={errors.qualification}>
                  <option value="">Select Qualification</option>
                  {QUALIFICATIONS.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </FormSelect>
              </FormGroup>

              <FormGroup label="Primary Subject" required error={errors.primarySubject?.message}>
                <FormSelect {...register('primarySubject', { required: 'Primary subject is required' })} error={errors.primarySubject}>
                  <option value="">Select Subject</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </FormSelect>
              </FormGroup>

              <FormGroup label="Assigned Classes" error={errors.assignedClasses?.message}>
                <FormSelect {...register('assignedClasses')}>
                  <option value="Class 9-10">Class 9 - Class 10</option>
                  <option value="Class 11-12">Class 11 - Class 12</option>
                  <option value="Class 6-8">Class 6 - Class 8</option>
                  <option value="All Senior Classes">All Senior Classes</option>
                </FormSelect>
              </FormGroup>

              <FormGroup label="Date of Joining" required error={errors.joiningDate?.message}>
                <FormInput
                  type="date"
                  {...register('joiningDate', { required: 'Joining date is required' })}
                  error={errors.joiningDate}
                />
              </FormGroup>
            </div>
          )}

          {activeTab === 'Address & Contact' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <FormGroup label="Residential Address" error={errors.address?.message}>
                  <textarea
                    {...register('address')}
                    rows={3}
                    placeholder="Full street address, city, state & pin code..."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                  />
                </FormGroup>
              </div>

              <FormGroup label="Emergency Contact Name" error={errors.emergencyName?.message}>
                <FormInput
                  {...register('emergencyName')}
                  placeholder="Relative or spouse name"
                />
              </FormGroup>

              <FormGroup label="Emergency Phone" error={errors.emergencyPhone?.message}>
                <FormInput
                  type="tel"
                  {...register('emergencyPhone')}
                  placeholder="+91 98765 00000"
                />
              </FormGroup>

              <FormGroup label="Employment Status" error={errors.status?.message}>
                <FormSelect {...register('status')}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive / On Leave</option>
                </FormSelect>
              </FormGroup>
            </div>
          )}
        </motion.div>

        {/* Responsive Footer Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-3 mt-5">
          <button
            type="button"
            onClick={() => navigate('/admin/teachers')}
            className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors text-center"
          >
            Cancel
          </button>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {activeTab !== TABS[TABS.length - 1] && (
              <button
                type="button"
                onClick={() => setActiveTab(TABS[TABS.indexOf(activeTab) + 1])}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-semibold text-slate-700 transition-colors text-center"
              >
                Next →
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm disabled:opacity-70"
            >
              <Save size={16} /> {isSubmitting ? 'Saving...' : 'Save & Onboard Teacher'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTeacherPage;
