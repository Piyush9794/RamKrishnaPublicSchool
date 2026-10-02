import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Library, Upload, FileText, Download, Trash2 } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import toast from '../../utils/toast';

const TeacherStudyMaterial = () => {
  const [showModal, setShowModal] = useState(false);
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Chapter 4: Quadratic Equations - Formula Sheet & Notes',
      class: 'Class 10-A',
      subject: 'Mathematics',
      fileType: 'PDF',
      fileSize: '3.4 MB',
      uploadDate: '2026-09-29',
    },
    {
      id: 2,
      title: 'Calculus Integration Formula Reference Guide',
      class: 'Class 12-A',
      subject: 'Advanced Calculus',
      fileType: 'PDF',
      fileSize: '5.1 MB',
      uploadDate: '2026-09-25',
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    class: 'Class 10-A',
    subject: 'Mathematics',
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (!formData.title) return toast.error('Title is required');

    const newItem = {
      id: Date.now(),
      title: formData.title,
      class: formData.class,
      subject: formData.subject,
      fileType: 'PDF',
      fileSize: '2.5 MB',
      uploadDate: new Date().toISOString().split('T')[0],
    };

    setMaterials([newItem, ...materials]);
    toast.success('Study material uploaded successfully!');
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Study Material & Notes"
        subtitle="Upload chapter notes, reference materials, and study guides for students"
        action={
          <Button icon={<Upload size={16} />} onClick={() => setShowModal(true)}>
            Upload Material
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex items-start justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <FileText size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {item.class} • {item.subject}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {item.fileType} • {item.fileSize} • Uploaded {item.uploadDate}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" icon={<Download size={16} />}>
              Download
            </Button>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Upload Study Material">
        <form onSubmit={handleUpload} className="space-y-4">
          <Input
            label="Material Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
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
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors">
            <Upload size={24} className="mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-700">Click or drag PDF/Docs to upload</p>
            <p className="text-xs text-slate-400 mt-1">Maximum file size 25MB</p>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Upload & Share</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherStudyMaterial;
