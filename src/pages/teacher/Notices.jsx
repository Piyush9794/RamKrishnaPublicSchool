import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Plus, Calendar, Tag, Paperclip } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import toast from '../../utils/toast';

const TeacherNotices = () => {
  const [showModal, setShowModal] = useState(false);
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Math Olympiad 2026 Registration Open',
      category: 'Academic',
      target: 'Class 10 & 12 Students',
      date: '2026-10-01',
      content: 'All interested students are requested to submit their names to Ms. Sarah Jenkins by Oct 10.',
      postedBy: 'Sarah Jenkins (You)',
    },
    {
      id: 2,
      title: 'Annual Sports Meet & Athletic Trials',
      category: 'General',
      target: 'All Students & Staff',
      date: '2026-09-28',
      content: 'School Annual Sports Meet will be held on Nov 12. Preliminary trials start next Monday.',
      postedBy: 'School Management',
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    target: 'Assigned Classes',
    content: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return toast.error('Title and content are required');

    const newItem = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      target: formData.target,
      date: new Date().toISOString().split('T')[0],
      content: formData.content,
      postedBy: 'Sarah Jenkins (You)',
    };

    setNotices([newItem, ...notices]);
    toast.success('Class notice posted successfully!');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="School & Class Notices"
        subtitle="View school announcements and broadcast notices to your assigned classes"
        action={
          <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>
            Post Class Notice
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices.map((notice, idx) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {notice.category} • {notice.target}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-2">{notice.title}</h3>
              </div>
              <Badge variant="indigo">{notice.date}</Badge>
            </div>

            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {notice.content}
            </p>

            <p className="text-xs text-slate-400">Posted by: <strong className="text-slate-600">{notice.postedBy}</strong></p>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Post Class Notice">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Notice Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={[
                { value: 'Academic', label: 'Academic' },
                { value: 'Homework', label: 'Homework' },
                { value: 'General', label: 'General' },
              ]}
            />
            <Select
              label="Target Audience"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              options={[
                { value: 'Class 10-A', label: 'Class 10-A' },
                { value: 'Class 10-B', label: 'Class 10-B' },
                { value: 'Class 12-A', label: 'Class 12-A' },
                { value: 'All My Classes', label: 'All My Classes' },
              ]}
            />
          </div>
          <Textarea
            label="Notice Announcement Details"
            required
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Broadcast Notice</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherNotices;
