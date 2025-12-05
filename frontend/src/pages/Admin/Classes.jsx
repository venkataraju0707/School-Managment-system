import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [className, setClassName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setClasses([
      { id: 1, name: 'Class 1' },
      { id: 2, name: 'Class 2' },
    ]);
  }, []);

  const handleSave = () => {
    setClasses([...classes, { id: Date.now(), name: className }]);
    setClassName('');
    setShowModal(false);
    setMessage('Class added!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleDelete = (id) => {
    setClasses(classes.filter((c) => c.id !== id));
    setMessage('Class deleted!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <AdminLayout>
      <h2>Classes</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Button onClick={() => setShowModal(true)}>Add Class</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Class Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.name}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(c.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
};

export default Classes;
