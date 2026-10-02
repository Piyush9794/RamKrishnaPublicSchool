import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, Users, ClipboardCheck, BookMarked,
  FileEdit, Library, CalendarDays, FileText, BarChart3,
  DollarSign, CreditCard, Megaphone, FileCheck, Bus,
  BookOpen, Files, Bell
} from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import MobileSidebar from '../layout/MobileSidebar';
import TopNavbar from '../layout/TopNavbar';
import { useTheme } from '../../context/ThemeContext';

const PARENT_NAV = [
  { href: '/parent/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
  { type: 'divider', label: 'Profile' },
  { href: '/parent/profile', icon: <User size={18} />, label: 'My Profile' },
  { href: '/parent/children', icon: <Users size={18} />, label: 'My Children' },
  { type: 'divider', label: 'Academics' },
  { href: '/parent/attendance', icon: <ClipboardCheck size={18} />, label: 'Attendance' },
  { href: '/parent/homework', icon: <BookMarked size={18} />, label: 'Homework' },
  { href: '/parent/assignments', icon: <FileEdit size={18} />, label: 'Assignments' },
  { href: '/parent/study-material', icon: <Library size={18} />, label: 'Study Material' },
  { href: '/parent/timetable', icon: <CalendarDays size={18} />, label: 'Timetable' },
  { type: 'divider', label: 'Exams' },
  { href: '/parent/exams', icon: <FileText size={18} />, label: 'Exam Schedule' },
  { href: '/parent/results', icon: <BarChart3 size={18} />, label: 'Results' },
  { type: 'divider', label: 'Finance' },
  { href: '/parent/fees', icon: <DollarSign size={18} />, label: 'Fee Details' },
  { href: '/parent/payments', icon: <CreditCard size={18} />, label: 'Payments' },
  { type: 'divider', label: 'Communication' },
  { href: '/parent/notices', icon: <Megaphone size={18} />, label: 'Notices' },
  { href: '/parent/notifications', icon: <Bell size={18} />, label: 'Notifications' },
  { type: 'divider', label: 'Services' },
  { href: '/parent/leave', icon: <FileCheck size={18} />, label: 'Leave Applications' },
  { href: '/parent/transport', icon: <Bus size={18} />, label: 'Transport' },
  { href: '/parent/library', icon: <BookOpen size={18} />, label: 'Library' },
  { href: '/parent/documents', icon: <Files size={18} />, label: 'Documents' },
];

const ParentLayout = () => {
  const { sidebarCollapsed } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar navItems={PARENT_NAV} role="parent" />
      <MobileSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={PARENT_NAV}
        role="parent"
      />
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        }`}
      >
        <TopNavbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;
