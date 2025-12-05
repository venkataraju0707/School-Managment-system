import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { isAdmin, isTeacher, isStudent, isParent } = useAuth();

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  const adminNavItems = [
    { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/admin/students', icon: 'bi-people', label: 'Students' },
    { path: '/admin/teachers', icon: 'bi-person-badge', label: 'Teachers' },
    { path: '/admin/parents', icon: 'bi-house-heart', label: 'Parents' },
    { path: '/admin/classes', icon: 'bi-building', label: 'Classes' },
    { path: '/admin/subjects', icon: 'bi-book', label: 'Subjects' },
    { path: '/admin/analytics', icon: 'bi-graph-up', label: 'Analytics' },
  ];

  const teacherNavItems = [
    { path: '/teacher/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/teacher/students', icon: 'bi-people', label: 'Students' },
    { path: '/teacher/attendance', icon: 'bi-calendar-check', label: 'Attendance' },
    { path: '/teacher/marks', icon: 'bi-clipboard-data', label: 'Marks' },
    { path: '/teacher/timetable', icon: 'bi-calendar-week', label: 'Timetable' },
  ];

  const studentNavItems = [
    { path: '/student/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/student/profile', icon: 'bi-person', label: 'Profile' },
    { path: '/student/marks', icon: 'bi-clipboard-data', label: 'Marks' },
    { path: '/student/attendance', icon: 'bi-calendar-check', label: 'Attendance' },
    { path: '/student/timetable', icon: 'bi-calendar-week', label: 'Timetable' },
  ];

  const parentNavItems = [
    { path: '/parent/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/parent/child', icon: 'bi-person', label: 'Child Details' },
    { path: '/parent/marks', icon: 'bi-clipboard-data', label: 'Marks' },
    { path: '/parent/attendance', icon: 'bi-calendar-check', label: 'Attendance' },
    { path: '/parent/timetable', icon: 'bi-calendar-week', label: 'Timetable' },
  ];

  const getNavItems = () => {
    if (isAdmin) return adminNavItems;
    if (isTeacher) return teacherNavItems;
    if (isStudent) return studentNavItems;
    if (isParent) return parentNavItems;
    return [];
  };

  const navItems = getNavItems();

  return (
    <div className="sidebar bg-dark text-white" style={{ width: '250px', minHeight: 'calc(100vh - 56px)' }}>
      <Nav className="flex-column p-3">
        {navItems.map((item) => (
          <Nav.Item key={item.path} className="mb-2">
            <Nav.Link 
              as={Link} 
              to={item.path} 
              className={`text-white ${isActive(item.path)}`}
              style={{
                borderRadius: '8px',
                transition: 'all 0.3s',
                padding: '10px 15px',
              }}
              activeClassName="bg-primary"
            >
              <i className={`${item.icon} me-2`}></i>
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
