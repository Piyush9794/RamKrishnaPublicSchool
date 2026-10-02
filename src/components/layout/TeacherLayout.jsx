import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, ClipboardCheck, Users, BookOpen,
  Layers, BookMarked, FileText, BarChart3, CalendarDays,
  Library, Megaphone, FileEdit, Bell, Pencil
} from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import MobileSidebar from '../layout/MobileSidebar';
import TopNavbar from '../layout/TopNavbar';
import { useTheme } from '../../context/ThemeContext';

const TEACHER_NAV = [
  { href: '/teacher/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
  { type: 'divider', label: 'Profile' },
  { href: '/teacher/profile', icon: <User size={18} />, label: 'My Profile' },
  { type: 'divider', label: 'Attendance' },
  { href: '/teacher/attendance', icon: <ClipboardCheck size={18} />, label: 'My Attendance' },
  { href: '/teacher/student-attendance', icon: <Users size={18} />, label: 'Student Attendance' },
  { type: 'divider', label: 'Academics' },
  { href: '/teacher/classes', icon: <BookOpen size={18} />, label: 'My Classes' },
  { href: '/teacher/subjects', icon: <Layers size={18} />, label: 'My Subjects' },
  { href: '/teacher/timetable', icon: <CalendarDays size={18} />, label: 'Timetable' },
  { href: '/teacher/homework', icon: <BookMarked size={18} />, label: 'Homework' },
  { href: '/teacher/assignments', icon: <FileEdit size={18} />, label: 'Assignments' },
  { href: '/teacher/study-material', icon: <Library size={18} />, label: 'Study Material' },
  { href: '/teacher/lesson-plans', icon: <Pencil size={18} />, label: 'Lesson Plans' },
  { type: 'divider', label: 'Exams' },
  { href: '/teacher/exams', icon: <FileText size={18} />, label: 'Exams' },
  { href: '/teacher/marks', icon: <BarChart3 size={18} />, label: 'Marks Entry' },
  { type: 'divider', label: 'Communication' },
  { href: '/teacher/notices', icon: <Megaphone size={18} />, label: 'Notices' },
  { href: '/teacher/notifications', icon: <Bell size={18} />, label: 'Notifications' },
  { type: 'divider', label: 'HR' },
  { href: '/teacher/leave', icon: <ClipboardCheck size={18} />, label: 'Leave Application' },
];

const TeacherLayout = () => {
  const { sidebarCollapsed } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar navItems={TEACHER_NAV} role="teacher" />
      <MobileSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={TEACHER_NAV}
        role="teacher"
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

export default TeacherLayout;
