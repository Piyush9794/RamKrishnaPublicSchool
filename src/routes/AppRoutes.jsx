import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import TeacherRoute from './TeacherRoute';
import ParentRoute from './ParentRoute';

import AdminLayout from '../components/layout/AdminLayout';
import TeacherLayout from '../components/layout/TeacherLayout';
import ParentLayout from '../components/layout/ParentLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Unauthorized from '../pages/auth/Unauthorized';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import StudentsListPage from '../pages/admin/students/StudentsListPage';
import AddStudentPage from '../pages/admin/students/AddStudentPage';
import StudentDetailPage from '../pages/admin/students/StudentDetailPage';
import IdCardDesignerPage from '../pages/admin/students/IdCardDesignerPage';
import TeachersListPage from '../pages/admin/teachers/TeachersListPage';
import AddTeacherPage from '../pages/admin/teachers/AddTeacherPage';
import ParentsListPage from '../pages/admin/parents/ParentsListPage';
import AcademicsPage from '../pages/admin/academics/AcademicsPage';
import StudentAttendancePage from '../pages/admin/attendance/StudentAttendancePage';
import TeacherAttendancePage from '../pages/admin/attendance/TeacherAttendancePage';
import FeesPage from '../pages/admin/fees/FeesPage';
import ExamsPage from '../pages/admin/exams/ExamsPage';
import ResultsPage from '../pages/admin/results/ResultsPage';
import TimetablePage from '../pages/admin/timetable/TimetablePage';
import HomeworkPage from '../pages/admin/homework/HomeworkPage';
import NoticesPage from '../pages/admin/notices/NoticesPage';
import TransportPage from '../pages/admin/transport/TransportPage';
import LibraryPage from '../pages/admin/library/LibraryPage';
import ReportsPage from '../pages/admin/reports/ReportsPage';
import AuditLogsPage from '../pages/admin/audit/AuditLogsPage';
import SettingsPage from '../pages/admin/settings/SettingsPage';

// Teacher Pages
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import TeacherProfile from '../pages/teacher/MyProfile';
import TeacherMyAttendance from '../pages/teacher/MyAttendance';
import TeacherStudentAttendance from '../pages/teacher/StudentAttendance';
import TeacherMyClasses from '../pages/teacher/MyClasses';
import TeacherMySubjects from '../pages/teacher/MySubjects';
import TeacherHomework from '../pages/teacher/Homework';
import TeacherAssignments from '../pages/teacher/Assignments';
import TeacherStudyMaterial from '../pages/teacher/StudyMaterial';
import TeacherLessonPlans from '../pages/teacher/LessonPlans';
import TeacherExams from '../pages/teacher/Exams';
import TeacherMarksEntry from '../pages/teacher/MarksEntry';
import TeacherTimetable from '../pages/teacher/Timetable';
import TeacherNotices from '../pages/teacher/Notices';
import TeacherLeaveApplication from '../pages/teacher/LeaveApplication';
import TeacherNotifications from '../pages/teacher/Notifications';

// Parent Pages
import ParentDashboard from '../pages/parent/ParentDashboard';
import ParentProfile from '../pages/parent/MyProfile';
import ParentMyChildren from '../pages/parent/MyChildren';
import ParentChildProfile from '../pages/parent/ChildProfile';
import ParentAttendance from '../pages/parent/Attendance';
import ParentHomework from '../pages/parent/Homework';
import ParentAssignments from '../pages/parent/Assignments';
import ParentStudyMaterial from '../pages/parent/StudyMaterial';
import ParentTimetable from '../pages/parent/Timetable';
import ParentExams from '../pages/parent/Exams';
import ParentResults from '../pages/parent/Results';
import ParentFees from '../pages/parent/Fees';
import ParentPayments from '../pages/parent/Payments';
import ParentNotices from '../pages/parent/Notices';
import ParentLeaveApplications from '../pages/parent/LeaveApplications';
import ParentTransport from '../pages/parent/Transport';
import ParentLibrary from '../pages/parent/Library';
import ParentDocuments from '../pages/parent/Documents';
import ParentNotifications from '../pages/parent/Notifications';

import { useAuth } from '../context/AuthContext';

import LandingPage from '../pages/landing/LandingPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Portal Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<StudentsListPage />} />
        <Route path="students/add" element={<AddStudentPage />} />
        <Route path="students/:id" element={<StudentDetailPage />} />
        <Route path="id-cards" element={<IdCardDesignerPage />} />
        <Route path="teachers" element={<TeachersListPage />} />
        <Route path="teachers/add" element={<AddTeacherPage />} />
        <Route path="parents" element={<ParentsListPage />} />
        <Route path="academics" element={<AcademicsPage />} />
        <Route path="attendance/students" element={<StudentAttendancePage />} />
        <Route path="attendance/teachers" element={<TeacherAttendancePage />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="exams" element={<ExamsPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="homework" element={<HomeworkPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="transport" element={<TransportPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="audit-logs" element={<AuditLogsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Teacher Portal Routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute>
            <TeacherRoute>
              <TeacherLayout />
            </TeacherRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="attendance" element={<TeacherMyAttendance />} />
        <Route path="student-attendance" element={<TeacherStudentAttendance />} />
        <Route path="classes" element={<TeacherMyClasses />} />
        <Route path="subjects" element={<TeacherMySubjects />} />
        <Route path="homework" element={<TeacherHomework />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="study-material" element={<TeacherStudyMaterial />} />
        <Route path="lesson-plans" element={<TeacherLessonPlans />} />
        <Route path="exams" element={<TeacherExams />} />
        <Route path="marks" element={<TeacherMarksEntry />} />
        <Route path="timetable" element={<TeacherTimetable />} />
        <Route path="notices" element={<TeacherNotices />} />
        <Route path="leave" element={<TeacherLeaveApplication />} />
        <Route path="notifications" element={<TeacherNotifications />} />
      </Route>

      {/* Parent Portal Routes */}
      <Route
        path="/parent"
        element={
          <ProtectedRoute>
            <ParentRoute>
              <ParentLayout />
            </ParentRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/parent/dashboard" replace />} />
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="profile" element={<ParentProfile />} />
        <Route path="children" element={<ParentMyChildren />} />
        <Route path="children/:id" element={<ParentChildProfile />} />
        <Route path="attendance" element={<ParentAttendance />} />
        <Route path="homework" element={<ParentHomework />} />
        <Route path="assignments" element={<ParentAssignments />} />
        <Route path="study-material" element={<ParentStudyMaterial />} />
        <Route path="timetable" element={<ParentTimetable />} />
        <Route path="exams" element={<ParentExams />} />
        <Route path="results" element={<ParentResults />} />
        <Route path="fees" element={<ParentFees />} />
        <Route path="payments" element={<ParentPayments />} />
        <Route path="notices" element={<ParentNotices />} />
        <Route path="leave" element={<ParentLeaveApplications />} />
        <Route path="transport" element={<ParentTransport />} />
        <Route path="library" element={<ParentLibrary />} />
        <Route path="documents" element={<ParentDocuments />} />
        <Route path="notifications" element={<ParentNotifications />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
