import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Calendar, Award, ChevronRight } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const CHILDREN = [
  {
    id: 'STU-101',
    name: 'Alexander Wright',
    class: 'Class 10-A',
    rollNo: '101',
    attendance: '94.5%',
    gpa: '3.8 / 4.0',
    classTeacher: 'Sarah Jenkins',
    busRoute: 'Route 4 - Sector 12',
  },
  {
    id: 'STU-102',
    name: 'Emily Wright',
    class: 'Class 5-B',
    rollNo: '508',
    attendance: '98.0%',
    gpa: '4.0 / 4.0',
    classTeacher: 'Michael Chang',
    busRoute: 'Route 4 - Sector 12',
  },
];

const MyChildren = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Children"
        subtitle="View profiles, academic summaries, and school records for your children"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHILDREN.map((child, idx) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <Avatar name={child.name} size="lg" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-800">{child.name}</h3>
                  <Badge variant="emerald">{child.class}</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Roll No: <strong className="text-slate-600 font-mono">{child.rollNo}</strong>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
              <div>
                <span className="text-slate-400">Class Teacher:</span>
                <p className="font-semibold text-slate-800">{child.classTeacher}</p>
              </div>
              <div>
                <span className="text-slate-400">Attendance Rate:</span>
                <p className="font-semibold text-emerald-600">{child.attendance}</p>
              </div>
              <div>
                <span className="text-slate-400">Overall GPA:</span>
                <p className="font-semibold text-indigo-600">{child.gpa}</p>
              </div>
              <div>
                <span className="text-slate-400">Transport:</span>
                <p className="font-semibold text-slate-800">{child.busRoute}</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => navigate(`/parent/children/${child.id}`)}
              icon={<ChevronRight size={16} />}
            >
              View Full Student Profile
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyChildren;
