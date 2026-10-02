import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Plus, Calendar, CheckCircle2, Clock } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import toast from '../../utils/toast';

const TeacherLessonPlans = () => {
  const [showModal, setShowModal] = useState(false);
  const [plans, setPlans] = useState([
    {
      id: 1,
      week: 'Week 6 (Oct 2 - Oct 6)',
      class: 'Class 10-A',
      subject: 'Mathematics',
      topic: 'Quadratic Equations - Factoring & Formula Method',
      objectives: 'Students will solve quadratic equations using factoring and quadratic formula with 90% accuracy.',
      status: 'Approved',
    },
    {
      id: 2,
      week: 'Week 7 (Oct 9 - Oct 13)',
      class: 'Class 12-A',
      subject: 'Advanced Calculus',
      topic: 'Integration by Substitution & Trigo Identities',
      objectives: 'Understand trigonometric substitution techniques and solve definite integration problems.',
      status: 'In Review',
    },
  ]);

  const [formData, setFormData] = useState({
    week: '',
    class: 'Class 10-A',
    subject: 'Mathematics',
    topic: '',
    objectives: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.topic) return toast.error('Topic is required');

    const newItem = {
      id: Date.now(),
      week: formData.week || 'Week 7',
      class: formData.class,
      subject: formData.subject,
      topic: formData.topic,
      objectives: formData.objectives,
      status: 'Submitted',
    };

    setPlans([newItem, ...plans]);
    toast.success('Lesson plan submitted for approval!');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lesson Plans"
        subtitle="Create, submit, and track weekly academic lesson plans and learning objectives"
        action={
          <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>
            Add Lesson Plan
          </Button>
        }
      />

      <div className="space-y-4">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {plan.week} • {plan.class} • {plan.subject}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-2">{plan.topic}</h3>
              </div>
              <Badge variant={plan.status === 'Approved' ? 'emerald' : 'amber'}>
                {plan.status}
              </Badge>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
              <span className="font-semibold text-slate-700">Learning Objectives: </span>
              {plan.objectives}
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Weekly Lesson Plan">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Week Period"
            placeholder="e.g. Week 7 (Oct 9 - Oct 13)"
            value={formData.week}
            onChange={(e) => setFormData({ ...formData, week: e.target.value })}
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
              label="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>
          <Input
            label="Topic / Unit Name"
            required
            placeholder="e.g. Quadratic Equations"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          />
          <Textarea
            label="Key Learning Objectives"
            rows={3}
            placeholder="State specific outcome goals..."
            value={formData.objectives}
            onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Lesson Plan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherLessonPlans;
