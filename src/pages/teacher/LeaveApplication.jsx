import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Plus, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import toast from '../../utils/toast';

const TeacherLeaveApplication = () => {
  const [showModal, setShowModal] = useState(false);
  const [leaveBalance] = useState({ casual: 8, sick: 5, earned: 12 });
  const [applications, setApplications] = useState([
    {
      id: 1,
      type: 'Casual Leave',
      startDate: '2026-10-12',
      endDate: '2026-10-13',
      days: 2,
      reason: 'Attending National Teachers Mathematics Conference.',
      status: 'Approved',
      appliedDate: '2026-09-30',
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2026-09-14',
      endDate: '2026-09-14',
      days: 1,
      reason: 'Viral fever.',
      status: 'Approved',
      appliedDate: '2026-09-13',
    },
  ]);

  const [formData, setFormData] = useState({
    type: 'Casual Leave',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleApply = (e) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate || !formData.reason) {
      return toast.error('Please fill all required fields');
    }

    const newItem = {
      id: Date.now(),
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: 1,
      reason: formData.reason,
      status: 'Pending Approval',
      appliedDate: new Date().toISOString().split('T')[0],
    };

    setApplications([newItem, ...applications]);
    toast.success('Leave application submitted!');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Applications"
        subtitle="Apply for leave, check leave balances, and track approval status"
        action={
          <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>
            Apply For Leave
          </Button>
        }
      />

      {/* Leave Balance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Casual Leave</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{leaveBalance.casual} Days</p>
          </div>
          <Badge variant="indigo">Available</Badge>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sick Leave</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{leaveBalance.sick} Days</p>
          </div>
          <Badge variant="emerald">Available</Badge>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Earned Leave</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{leaveBalance.earned} Days</p>
          </div>
          <Badge variant="violet">Available</Badge>
        </div>
      </div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
      >
        <h3 className="text-base font-bold text-slate-800">Application History</h3>

        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded">
                    {app.type}
                  </span>
                  <span className="text-xs text-slate-400">Applied on {app.appliedDate}</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {app.startDate} to {app.endDate} ({app.days} Day)
                </p>
                <p className="text-xs text-slate-500 mt-1">{app.reason}</p>
              </div>
              <Badge variant={app.status === 'Approved' ? 'emerald' : app.status === 'Pending Approval' ? 'amber' : 'red'}>
                {app.status}
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Apply for Leave">
        <form onSubmit={handleApply} className="space-y-4">
          <Select
            label="Leave Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={[
              { value: 'Casual Leave', label: 'Casual Leave' },
              { value: 'Sick Leave', label: 'Sick Leave' },
              { value: 'Earned Leave', label: 'Earned Leave' },
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <Input
              label="End Date"
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
          <Textarea
            label="Reason for Leave"
            required
            rows={3}
            placeholder="Please provide valid reasons for your leave..."
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Leave Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherLeaveApplication;
