import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, UserCheck, UserCog, BookOpen,
  ClipboardList, DollarSign, FileText, BarChart3, CalendarDays,
  BookMarked, Megaphone, Bus, Library, PieChart, Shield, Settings,
  GraduationCap, CreditCard
} from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import MobileSidebar from '../layout/MobileSidebar';
import TopNavbar from '../layout/TopNavbar';
import { useTheme } from '../../context/ThemeContext';

const ADMIN_NAV = [
  { href: '/admin/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
  { type: 'divider', label: 'People' },
  { href: '/admin/students', icon: <GraduationCap size={18} />, label: 'Students' },
  { href: '/admin/id-cards', icon: <CreditCard size={18} />, label: 'ID Card Designer' },
  { href: '/admin/teachers', icon: <UserCheck size={18} />, label: 'Teachers' },
  { href: '/admin/parents', icon: <Users size={18} />, label: 'Parents' },
  { type: 'divider', label: 'Academics' },
  { href: '/admin/academics', icon: <BookOpen size={18} />, label: 'Academics' },
  {
    icon: <ClipboardList size={18} />, label: 'Attendance',
    children: [
      { href: '/admin/attendance/students', label: 'Student Attendance' },
      { href: '/admin/attendance/teachers', label: 'Teacher Attendance' },
    ],
  },
  { href: '/admin/timetable', icon: <CalendarDays size={18} />, label: 'Timetable' },
  { href: '/admin/homework', icon: <BookMarked size={18} />, label: 'Homework' },
  { href: '/admin/exams', icon: <FileText size={18} />, label: 'Exams' },
  { href: '/admin/results', icon: <BarChart3 size={18} />, label: 'Results' },
  { type: 'divider', label: 'Finance' },
  { href: '/admin/fees', icon: <DollarSign size={18} />, label: 'Fees & Accounts' },
  { type: 'divider', label: 'Communication' },
  { href: '/admin/notices', icon: <Megaphone size={18} />, label: 'Notices' },
  { type: 'divider', label: 'Infrastructure' },
  { href: '/admin/transport', icon: <Bus size={18} />, label: 'Transport' },
  { href: '/admin/library', icon: <Library size={18} />, label: 'Library' },
  { type: 'divider', label: 'System' },
  { href: '/admin/reports', icon: <PieChart size={18} />, label: 'Reports' },
  { href: '/admin/audit-logs', icon: <Shield size={18} />, label: 'Audit Logs' },
  { href: '/admin/settings', icon: <Settings size={18} />, label: 'Settings' },
];

const AdminLayout = () => {
  const { sidebarCollapsed } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <Sidebar navItems={ADMIN_NAV} role="admin" />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={ADMIN_NAV}
        role="admin"
      />

      {/* Main Content */}
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

export default AdminLayout;
