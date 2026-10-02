import React from 'react';
import { motion } from 'framer-motion';
import { Library, FileText, Download } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const ParentStudyMaterial = () => {
  const materials = [
    {
      id: 1,
      title: 'Chapter 4: Quadratic Equations - Formula Sheet',
      subject: 'Mathematics',
      teacher: 'Sarah Jenkins',
      fileSize: '3.4 MB',
      uploadDate: '2026-09-29',
    },
    {
      id: 2,
      title: 'Physics Motion Laws Chapter Summary & Numericals',
      subject: 'Physics',
      teacher: 'Dr. Alan Vance',
      fileSize: '4.8 MB',
      uploadDate: '2026-09-24',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Class Study Materials"
        subtitle="Access and download course material, notes, and revision sheets for your child"
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
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <FileText size={20} />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {item.subject} • {item.teacher}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1">PDF • {item.fileSize} • Added {item.uploadDate}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" icon={<Download size={16} />}>
              Download
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParentStudyMaterial;
