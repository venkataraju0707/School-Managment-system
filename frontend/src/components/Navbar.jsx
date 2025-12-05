import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
  const { user, logout, isAdmin, isTeacher, isStudent, isParent } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getUserName = () => {
    if (user) {
      return user.name || user.email.split('@')[0];
    }
    return '';
  };

  const getUserInitials = () => {
    const name = getUserName();
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to={`/${user.role}/dashboard`}>
          <i className="bi bi-mortarboard-fill me-2"></i>
          School Management System
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to={`/${user.role}/dashboard`}>
              Dashboard
            </Nav.Link>
            
            {isAdmin && (
              <>
                <Nav.Link as={Link} to="/admin/students">
                  Students
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/teachers">
                  Teachers
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/parents">
                  Parents
                </Nav.Link>
              </>
            )}
            
            {isTeacher && (
              <>
                <Nav.Link as={Link} to="/teacher/students">
                  Students
                </Nav.Link>
                <Nav.Link as={Link} to="/teacher/attendance">
                  Attendance
                </Nav.Link>
              </>
            )}
            
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" className="d-flex align-items-center">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                     style={{ width: '32px', height: '32px', fontSize: '12px' }}>
                  {getUserInitials()}
                </div>
                {getUserName()}
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person me-2"></i>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
