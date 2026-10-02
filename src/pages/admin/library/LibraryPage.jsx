import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Library, Plus, Search, Eye, Book, BookOpen, RefreshCw, AlertCircle } from 'lucide-react';
import PageHeader from '../../../components/common/PageHeader';
import Badge from '../../../components/common/Badge';
import Pagination from '../../../components/common/Pagination';

const TABS = ['Books', 'Issued', 'Return'];

const SAMPLE_BOOKS = Array.from({ length: 20 }, (_, i) => ({
  id: `BK${1000 + i}`,
  isbn: `978-${String(1000000 + i)}`,
  title: ['Mathematics Textbook Grade 9', 'Physics Concepts', 'English Literature', 'Indian History', 'Computer Science Fundamentals'][i % 5],
  author: ['R.D. Sharma', 'H.C. Verma', 'Wren & Martin', 'Bipin Chandra', 'Peter Norton'][i % 5],
  category: ['Science', 'Science', 'Language', 'Social Science', 'Technology'][i % 5],
  totalCopies: 10,
  available: Math.max(0, 10 - (i % 5)),
  issued: Math.min(i % 5, 10),
}));

const ISSUED_BOOKS = Array.from({ length: 10 }, (_, i) => ({
  id: `ISS${1000 + i}`,
  studentName: ['Aarav Sharma', 'Priya Patel', 'Rohan Mehta'][i % 3],
  studentId: `STU${1000 + i}`,
  book: SAMPLE_BOOKS[i].title,
  bookId: SAMPLE_BOOKS[i].id,
  issueDate: '2026-09-25',
  dueDate: `2026-10-${String(10 + i).padStart(2, '0')}`,
  status: i < 7 ? 'Issued' : 'Overdue',
  fine: i < 7 ? 0 : (i - 7) * 5,
}));

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState('Books');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = SAMPLE_BOOKS.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.isbn.includes(search));
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Library"
        subtitle="Manage books, issue and return records"
        icon={<Library size={20} className="text-indigo-600" />}
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm">
            <Plus size={16} /> Add Book
          </button>
        }
      />

      <div className="flex gap-1 bg-white rounded-2xl p-1.5 card-shadow overflow-x-auto no-scrollbar">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
            {tab}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        {activeTab === 'Books' && (
          <>
            <div className="bg-white rounded-2xl p-4 card-shadow flex gap-3 mb-4">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title or ISBN..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
            </div>
            <div className="bg-white rounded-2xl card-shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      {['ISBN', 'Title', 'Author', 'Category', 'Total', 'Available', 'Issued', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {paged.map((b, i) => (
                      <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3 font-mono text-xs text-slate-500">{b.isbn}</td>
                        <td className="px-4 py-3 max-w-[200px]">
                          <div className="flex items-center gap-2">
                            <Book size={14} className="text-slate-400 shrink-0" />
                            <span className="font-medium text-slate-900 truncate">{b.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{b.author}</td>
                        <td className="px-4 py-3"><Badge variant="secondary" size="sm">{b.category}</Badge></td>
                        <td className="px-4 py-3 text-slate-700 font-medium">{b.totalCopies}</td>
                        <td className="px-4 py-3">
                          <span className={`font-medium ${b.available > 0 ? 'text-emerald-600' : 'text-red-500'}`}>{b.available}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{b.issued}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600"><Eye size={15} /></button>
                            <button className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-600" title="Issue"><BookOpen size={15} /></button>
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
            </div>
          </>
        )}

        {activeTab === 'Issued' && (
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {['Student', 'Book', 'Issue Date', 'Due Date', 'Fine', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {ISSUED_BOOKS.map((ib, i) => (
                    <tr key={ib.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">{ib.studentName}</p>
                        <p className="text-xs text-slate-400">{ib.studentId}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate">{ib.book}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{ib.issueDate}</td>
                      <td className="px-4 py-3 text-slate-700 text-xs font-medium">{ib.dueDate}</td>
                      <td className="px-4 py-3">
                        {ib.fine > 0 ? (
                          <span className="flex items-center gap-1 text-red-500 text-xs font-medium"><AlertCircle size={12} />₹{ib.fine}</span>
                        ) : <span className="text-slate-400 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3"><Badge variant={ib.status === 'Issued' ? 'info' : 'danger'} size="sm">{ib.status}</Badge></td>
                      <td className="px-4 py-3">
                        <button className="inline-flex items-center gap-1 p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-600 text-xs font-medium transition-colors">
                          <RefreshCw size={14} /> Return
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Return' && (
          <div className="bg-white rounded-2xl card-shadow p-8 text-center">
            <RefreshCw size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Use the Issued tab to process book returns.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LibraryPage;
