import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import Students from './pages/Admin/Students';
import Teachers from './pages/Admin/Teachers';
import Parents from './pages/Admin/Parents';
import Classes from './pages/Admin/Classes';
import Subjects from './pages/Admin/Subjects';

// Teacher Pages
import TeacherDashboard from './pages/Teacher/Dashboard';
import StudentList from './pages/Teacher/StudentList';
import Attendance from './pages/Teacher/Attendance';
import Marks from './pages/Teacher/Marks';

// Student Pages
import StudentDashboard from './pages/Student/Dashboard';
import StudentMarks from './pages/Student/Marks';
import StudentAttendance from './pages/Student/Attendance';

// Parent Pages
import ParentDashboard from './pages/Parent/Dashboard';
import ChildDetails from './pages/Parent/childDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <ProtectedRoute allowedRoles={['admin']}><Students /></ProtectedRoute>
        } />
        <Route path="/admin/teachers" element={
          <ProtectedRoute allowedRoles={['admin']}><Teachers /></ProtectedRoute>
        } />
        <Route path="/admin/parents" element={
          <ProtectedRoute allowedRoles={['admin']}><Parents /></ProtectedRoute>
        } />
        <Route path="/admin/classes" element={
          <ProtectedRoute allowedRoles={['admin']}><Classes /></ProtectedRoute>
        } />
        <Route path="/admin/subjects" element={
          <ProtectedRoute allowedRoles={['admin']}><Subjects /></ProtectedRoute>
        } />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={
          <ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>
        } />
        <Route path="/teacher/students" element={
          <ProtectedRoute allowedRoles={['teacher']}><StudentList /></ProtectedRoute>
        } />
        <Route path="/teacher/attendance" element={
          <ProtectedRoute allowedRoles={['teacher']}><Attendance /></ProtectedRoute>
        } />
        <Route path="/teacher/marks" element={
          <ProtectedRoute allowedRoles={['teacher']}><Marks /></ProtectedRoute>
        } />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>
        } />
        <Route path="/student/marks" element={
          <ProtectedRoute allowedRoles={['student']}><StudentMarks /></ProtectedRoute>
        } />
        <Route path="/student/attendance" element={
          <ProtectedRoute allowedRoles={['student']}><StudentAttendance /></ProtectedRoute>
        } />

        {/* Parent Routes */}
        <Route path="/parent/dashboard" element={
          <ProtectedRoute allowedRoles={['parent']}><ParentDashboard /></ProtectedRoute>
        } />
        <Route path="/parent/child" element={
          <ProtectedRoute allowedRoles={['parent']}><ChildDetails /></ProtectedRoute>
        } />

        {/* Default Redirect */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
