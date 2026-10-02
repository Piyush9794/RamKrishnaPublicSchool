import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Eye, Edit2, UserX, Phone, Mail, Download } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';
import Pagination from '../../../components/common/Pagination';
import EmptyState from '../../../components/common/EmptyState';

const SAMPLE_PARENTS = Array.from({ length: 20 }, (_, i) => ({
  id: `PAR${200 + i}`,
  name: ['Rajesh Sharma', 'Sunita Patel', 'Mohammed Khan', 'Kavita Gupta', 'Ashok Mehta'][i % 5],
  phone: `97${String(1234567 + i * 13)}`,
  email: `parent${i}@gmail.com`,
  children: Math.floor(Math.random() * 2) + 1,
  childNames: i % 2 === 0 ? 'Aarav Sharma' : 'Priya Patel, Rohan Patel',
  status: i % 10 === 9 ? 'inactive' : 'active',
  joinDate: '2022-04-01',
}));

const ParentsListPage = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = SAMPLE_PARENTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Parents"
        subtitle={`${SAMPLE_PARENTS.length} registered parents`}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} /> Add Parent
          </button>
        }
      />

      <div className="bg-white rounded-2xl p-4 card-shadow flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search by name or phone..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <Download size={15} /> Export
        </button>
      </div>

      <div className="bg-white rounded-2xl card-shadow overflow-hidden">
        {paged.length === 0 ? <EmptyState title="No parents found" /> : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Parent ID', 'Name', 'Contact', 'Children', 'Linked Students', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {paged.map((p, i) => (
                    <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {p.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1 text-xs text-slate-500"><Phone size={11} />{p.phone}</span>
                          <span className="flex items-center gap-1 text-xs text-slate-500"><Mail size={11} />{p.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-700">{p.children}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{p.childNames}</td>
                      <td className="px-4 py-3"><Badge variant={p.status === 'active' ? 'success' : 'danger'} size="sm">{p.status}</Badge></td>
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

export default ParentsListPage;
