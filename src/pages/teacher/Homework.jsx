import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Plus, Calendar, CheckCircle2, Clock, FileText, Trash2, Edit2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import toast from '../../utils/toast';

const TeacherHomework = () => {
  const [showModal, setShowModal] = useState(false);
  const [homeworkList, setHomeworkList] = useState([
    {
      id: 1,
      title: 'Quadratic Equations Practice Set 4.2',
      class: 'Class 10-A',
      subject: 'Mathematics',
      assignedDate: '2026-10-01',
      dueDate: '2026-10-05',
      submissions: '32/38',
      status: 'Active',
      description: 'Solve problems 1 to 15 from Chapter 4 Exercise 4.2 in the notebook.',
    },
    {
      id: 2,
      title: 'Polynomial Graphs Worksheet',
      class: 'Class 10-B',
      subject: 'Mathematics',
      assignedDate: '2026-09-28',
      dueDate: '2026-10-02',
      submissions: '40/40',
      status: 'Evaluated',
      description: 'Complete the graph plotting worksheet attached and submit PDF copy.',
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    class: 'Class 10-A',
    subject: 'Mathematics',
    dueDate: '',
    description: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) {
      toast.error('Please fill out title and due date');
      return;
    }

    const newItem = {
      id: Date.now(),
      title: formData.title,
      class: formData.class,
      subject: formData.subject,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: formData.dueDate,
      submissions: '0/38',
      status: 'Active',
      description: formData.description,
    };

    setHomeworkList([newItem, ...homeworkList]);
    toast.success('Homework created successfully!');
    setShowModal(false);
    setFormData({ title: '', class: 'Class 10-A', subject: 'Mathematics', dueDate: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Homework Management"
        subtitle="Assign, track, and grade student homework for your assigned classes"
        action={
          <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>
            Create Homework
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homeworkList.map((hw, idx) => (
          <motion.div
            key={hw.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {hw.class} • {hw.subject}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-2">{hw.title}</h3>
              </div>
              <Badge variant={hw.status === 'Active' ? 'indigo' : 'emerald'}>
                {hw.status}
              </Badge>
            </div>

            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {hw.description}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400" />
                <span>Due: {hw.dueDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="font-semibold text-slate-700">{hw.submissions} Submitted</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Assign New Homework"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Homework Title"
            required
            placeholder="e.g. Chapter 5 Practice Set"
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
              label="Due Date"
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <Textarea
            label="Instructions / Description"
            placeholder="Specify problem numbers or guidelines..."
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Assign Homework</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherHomework;
