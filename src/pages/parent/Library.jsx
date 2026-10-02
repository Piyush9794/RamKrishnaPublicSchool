import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Badge from '../../components/common/Badge';

const ParentLibrary = () => {
  const libraryRecords = [
    {
      id: 1,
      bookTitle: 'Concepts of Physics (Vol 1)',
      author: 'H.C. Verma',
      isbn: '978-8177091877',
      issueDate: '2026-09-18',
      dueDate: '2026-10-09',
      status: 'Issued',
      fine: '$0',
    },
    {
      id: 2,
      bookTitle: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '978-0553380163',
      issueDate: '2026-08-10',
      dueDate: '2026-08-25',
      status: 'Returned',
      fine: '$0',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Library Records"
        subtitle="Books currently issued to your child, return due dates, and borrowing history"
      />

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-800">Borrowing History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase">
              <tr>
                <th className="py-3 px-4">Book Title & Author</th>
                <th className="py-3 px-4">ISBN</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {libraryRecords.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {item.bookTitle}
                    <span className="block text-xs text-slate-400 font-normal">by {item.author}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-slate-500">{item.isbn}</td>
                  <td className="py-3 px-4 text-slate-500">{item.issueDate}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{item.dueDate}</td>
                  <td className="py-3 px-4">
                    <Badge variant={item.status === 'Issued' ? 'emerald' : 'slate'}>
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParentLibrary;
