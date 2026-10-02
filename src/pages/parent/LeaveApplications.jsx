import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Plus, Calendar } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import toast from '../../utils/toast';

const ParentLeaveApplications = () => {
  const [showModal, setShowModal] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([
    {
      id: 1,
      childName: 'Alexander Wright',
      startDate: '2026-09-25',
      endDate: '2026-09-25',
      days: 1,
      reason: 'Medical checkup and dental appointment.',
      status: 'Approved',
      appliedDate: '2026-09-24',
    },
  ]);

  const [formData, setFormData] = useState({
    childName: 'Alexander Wright',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleApply = (e) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate || !formData.reason) {
      return toast.error('Please fill out all fields');
    }

    const newItem = {
      id: Date.now(),
      childName: formData.childName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: 1,
      reason: formData.reason,
      status: 'Pending Approval',
      appliedDate: new Date().toISOString().split('T')[0],
    };

    setLeaveHistory([newItem, ...leaveHistory]);
    toast.success('Student leave application submitted to class teacher!');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Leave Applications"
        subtitle="Apply for student absence leave on behalf of your child and track approval status"
        action={
          <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>
            Apply Student Leave
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
      >
        <h3 className="text-base font-bold text-slate-800">Submitted Leave Requests</h3>

        <div className="space-y-3">
          {leaveHistory.map((item) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                    {item.childName}
                  </span>
                  <span className="text-xs text-slate-400">Applied on {item.appliedDate}</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  Dates: {item.startDate} to {item.endDate} ({item.days} Day)
                </p>
                <p className="text-xs text-slate-500 mt-1">{item.reason}</p>
              </div>
              <Badge variant={item.status === 'Approved' ? 'emerald' : 'amber'}>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Submit Student Leave Request">
        <form onSubmit={handleApply} className="space-y-4">
          <Select
            label="Select Child"
            value={formData.childName}
            onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
            options={[
              { value: 'Alexander Wright', label: 'Alexander Wright (Class 10-A)' },
              { value: 'Emily Wright', label: 'Emily Wright (Class 5-B)' },
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Leave From"
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <Input
              label="Leave To"
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
          <Textarea
            label="Reason for Absence"
            required
            rows={3}
            placeholder="Specify illness, family emergency, or travel details..."
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

export default ParentLeaveApplications;
