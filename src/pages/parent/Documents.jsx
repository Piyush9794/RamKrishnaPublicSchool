import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Files, Upload, Download, Eye, Trash2, FileText } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import toast from '../../utils/toast';

const ParentDocuments = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Birth_Certificate_Alexander.pdf',
      type: 'Birth Certificate',
      size: '1.4 MB',
      uploadDate: '2020-04-10',
      status: 'Verified',
    },
    {
      id: 2,
      name: 'Transfer_Certificate_PrevSchool.pdf',
      type: 'Transfer Certificate (TC)',
      size: '2.1 MB',
      uploadDate: '2020-04-12',
      status: 'Verified',
    },
    {
      id: 3,
      name: 'Immunization_Record_2024.pdf',
      type: 'Medical Record',
      size: '950 KB',
      uploadDate: '2024-01-15',
      status: 'Verified',
    },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Birth Certificate',
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (!formData.title) return toast.error('Document title is required');

    const newItem = {
      id: Date.now(),
      name: `${formData.title.replace(/\s+/g, '_')}.pdf`,
      type: formData.type,
      size: '1.8 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Pending Verification',
    };

    setDocuments([newItem, ...documents]);
    toast.success('Document uploaded for verification!');
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Official Documents"
        subtitle="Manage, view, and upload student birth certificates, TC, ID proofs, and medical records"
        action={
          <Button icon={<Upload size={16} />} onClick={() => setShowUploadModal(true)}>
            Upload New Document
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc, idx) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <FileText size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {doc.type}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 mt-1">{doc.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{doc.size} • Uploaded {doc.uploadDate}</p>
                </div>
              </div>
              <Badge variant={doc.status === 'Verified' ? 'emerald' : 'amber'}>
                {doc.status}
              </Badge>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="ghost" size="sm" icon={<Eye size={14} />}>Preview</Button>
              <Button variant="ghost" size="sm" icon={<Download size={14} />}>Download</Button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Document">
        <form onSubmit={handleUpload} className="space-y-4">
          <Input
            label="Document Name / Title"
            required
            placeholder="e.g. Passport Copy"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Select
            label="Document Category"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            options={[
              { value: 'Birth Certificate', label: 'Birth Certificate' },
              { value: 'Transfer Certificate (TC)', label: 'Transfer Certificate (TC)' },
              { value: 'Medical Record', label: 'Medical Record' },
              { value: 'National ID / Passport', label: 'National ID / Passport' },
              { value: 'Other Document', label: 'Other Document' },
            ]}
          />
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors">
            <Upload size={24} className="mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-medium text-slate-700">Click or drag document to upload</p>
            <p className="text-xs text-slate-400 mt-1">Accepted: PDF, JPG, PNG (Max 15MB)</p>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Document</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ParentDocuments;
