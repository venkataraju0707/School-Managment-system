import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const ParentLayout = ({ children }) => {
  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10} className="p-4">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ParentLayout;
