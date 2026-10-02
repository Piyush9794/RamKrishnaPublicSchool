import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus, Search, Filter, Eye, Edit2, UserX, UserCheck,
  GraduationCap, Phone, Mail, MapPin, MoreVertical, Download, CreditCard
} from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';
import EmptyState from '../../../components/common/EmptyState';
import Pagination from '../../../components/common/Pagination';

const SAMPLE_STUDENTS = Array.from({ length: 25 }, (_, i) => ({
  id: `STU${1000 + i}`,
  name: ['Aarav Sharma', 'Priya Patel', 'Rohan Mehta', 'Ananya Singh', 'Karan Joshi', 'Neha Gupta', 'Arjun Verma', 'Pooja Agarwal'][i % 8],
  class: `Class ${Math.floor(i / 3) + 6}`,
  section: ['A', 'B', 'C'][i % 3],
  rollNo: `${String(i + 1).padStart(3, '0')}`,
  parentName: 'Rajesh Kumar',
  phone: `98${String(1000000 + i * 7)}`,
  status: i % 8 === 7 ? 'inactive' : 'active',
  gender: i % 2 === 0 ? 'Male' : 'Female',
  admissionDate: '2024-04-01',
}));

const CLASSES = ['All Classes', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

const StudentsListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = SAMPLE_STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search) || s.rollNo.includes(search);
    const matchClass = selectedClass === 'All Classes' || s.class === selectedClass;
    return matchSearch && matchClass;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Students"
        subtitle={`${SAMPLE_STUDENTS.length} total students`}
        icon={<GraduationCap size={22} className="text-indigo-600" />}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate('/admin/id-cards')}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold transition-colors shadow-xs"
            >
              <CreditCard size={16} className="text-indigo-600" /> ID Card Designer
            </button>
            <button
              onClick={() => navigate('/admin/students/add')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              <Plus size={16} /> Add Student
            </button>
          </div>
        }
      />

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 card-shadow flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search by name, ID or roll number..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <select
          value={selectedClass}
          onChange={e => { setSelectedClass(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        >
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <Download size={15} /> Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        {paged.length === 0 ? (
          <EmptyState title="No students found" description="Try adjusting your search or filters." />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Student ID', 'Name', 'Class', 'Roll No.', 'Parent', 'Phone', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paged.map((s, i) => (
                    <motion.tr
                      key={s.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{s.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {s.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-900">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{s.class}-{s.section}</td>
                      <td className="px-4 py-3 text-slate-600">{s.rollNo}</td>
                      <td className="px-4 py-3 text-slate-600">{s.parentName}</td>
                      <td className="px-4 py-3 text-slate-600">{s.phone}</td>
                      <td className="px-4 py-3">
                        <Badge variant={s.status === 'active' ? 'success' : 'danger'} size="sm">{s.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => navigate(`/admin/students/${s.id}`)} className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors" title="View">
                            <Eye size={15} />
                          </button>
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors" title="Edit">
                            <Edit2 size={15} />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors" title="Deactivate">
                            <UserX size={15} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-100">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentsListPage;
