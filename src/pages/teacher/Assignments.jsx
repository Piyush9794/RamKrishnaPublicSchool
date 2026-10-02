import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileEdit, Plus, Calendar, CheckCircle2, Paperclip } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import toast from '../../utils/toast';

const TeacherAssignments = () => {
  const [showModal, setShowModal] = useState(false);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Term Project: Mathematical Modeling of Real World Growth',
      class: 'Class 12-A',
      subject: 'Advanced Calculus',
      maxMarks: 50,
      dueDate: '2026-10-15',
      submissions: '18/32',
      status: 'Open',
    },
    {
      id: 2,
      title: 'Mid-Term Algebra Case Study',
      class: 'Class 10-A',
      subject: 'Mathematics',
      maxMarks: 25,
      dueDate: '2026-10-08',
      submissions: '35/38',
      status: 'Open',
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    class: 'Class 10-A',
    subject: 'Mathematics',
    maxMarks: '50',
    dueDate: '',
    description: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) {
      toast.error('Title and due date are required');
      return;
    }

    const newItem = {
      id: Date.now(),
      title: formData.title,
      class: formData.class,
      subject: formData.subject,
      maxMarks: Number(formData.maxMarks),
      dueDate: formData.dueDate,
      submissions: '0/35',
      status: 'Open',
    };

    setAssignments([newItem, ...assignments]);
    toast.success('Assignment created!');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignments"
        subtitle="Manage term projects, graded assignments, and deadline submissions"
        action={
          <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>
            Create Assignment
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {item.class} • {item.subject}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-2">{item.title}</h3>
              </div>
              <Badge variant="indigo">{item.status}</Badge>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <span>Max Marks: <strong className="text-slate-800">{item.maxMarks}</strong></span>
              <span>•</span>
              <span>Deadline: <strong className="text-slate-800">{item.dueDate}</strong></span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-emerald-600 font-bold">{item.submissions} Submissions Received</span>
              <Button variant="ghost" size="sm">Evaluate Submissions</Button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Assignment">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Assignment Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Class"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              options={[
                { value: 'Class 10-A', label: 'Class 10-A' },
                { value: 'Class 10-B', label: 'Class 10-B' },
                { value: 'Class 12-A', label: 'Class 12-A' },
              ]}
            />
            <Input
              label="Max Marks"
              type="number"
              value={formData.maxMarks}
              onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
            />
          </div>
          <Input
            label="Due Date"
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
          <Textarea
            label="Instructions"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Publish Assignment</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherAssignments;
