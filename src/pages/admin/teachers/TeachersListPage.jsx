import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Eye, Edit2, UserX, UserCheck, Mail, Phone, Download } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';
import Pagination from '../../../components/common/Pagination';
import EmptyState from '../../../components/common/EmptyState';

const SAMPLE_TEACHERS = Array.from({ length: 18 }, (_, i) => ({
  id: `TCH${100 + i}`,
  name: ['Suresh Kumar', 'Priti Agarwal', 'Mohammed Ali', 'Sunita Verma', 'Deepak Jain', 'Kavita Rao'][i % 6],
  employeeId: `EMP${2000 + i}`,
  subjects: [['Mathematics', 'Physics'], ['English', 'Social Science'], ['Chemistry', 'Biology'], ['Hindi', 'Sanskrit']].flat(1)[(i * 2) % 5],
  classes: `Class ${9 + (i % 4)}`,
  phone: `98${String(1234567 + i * 11)}`,
  email: `teacher${i}@school.edu`,
  qualification: ['M.Sc.', 'M.A.', 'B.Ed.', 'M.Ed.'][i % 4],
  status: i % 9 === 8 ? 'inactive' : 'active',
  joinDate: '2020-06-01',
}));

const TeachersListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersList, setTeachersList] = useState(SAMPLE_TEACHERS);
  const pageSize = 10;

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rkps_custom_teachers');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTeachersList([...parsed, ...SAMPLE_TEACHERS]);
        }
      }
    } catch (e) {
      console.error('Failed to parse rkps_custom_teachers', e);
    }
  }, []);

  const filtered = teachersList.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.employeeId.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Teachers"
        subtitle={`${teachersList.length} total staff`}
        actions={
          <button
            onClick={() => navigate('/admin/teachers/add')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={16} /> Add Teacher
          </button>
        }
      />

      <div className="bg-white rounded-2xl p-4 card-shadow flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search by name or employee ID..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <Download size={15} /> Export
        </button>
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        {paged.length === 0 ? <EmptyState title="No teachers found" /> : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Employee ID', 'Name', 'Subjects', 'Classes', 'Qualification', 'Contact', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paged.map((t, i) => (
                    <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{t.employeeId}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {t.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-900">{t.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{t.subjects}</td>
                      <td className="px-4 py-3 text-slate-600">{t.classes}</td>
                      <td className="px-4 py-3 text-slate-600">{t.qualification}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1 text-xs text-slate-500"><Phone size={11} />{t.phone}</span>
                          <span className="flex items-center gap-1 text-xs text-slate-500"><Mail size={11} />{t.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Badge variant={t.status === 'active' ? 'success' : 'danger'} size="sm">{t.status}</Badge></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors"><Eye size={15} /></button>
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><Edit2 size={15} /></button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors"><UserX size={15} /></button>
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

export default TeachersListPage;
