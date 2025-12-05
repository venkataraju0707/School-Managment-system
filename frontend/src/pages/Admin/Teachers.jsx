import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';
import { adminApi } from '../../api/adminApi';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch teachers (placeholder)
    setTeachers([
      { id: 1, name: 'Mr. John Doe', email: 'john@example.com' },
      { id: 2, name: 'Ms. Jane Smith', email: 'jane@example.com' },
    ]);
  }, []);

  const handleSave = () => {
    if (!formData.name || !formData.email) return;
    setTeachers([...teachers, { id: Date.now(), ...formData }]);
    setFormData({ name: '', email: '' });
    setShowModal(false);
    setMessage('Teacher added successfully!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter((t) => t.id !== id));
    setMessage('Teacher deleted!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <AdminLayout>
      <h2>Teachers</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Button onClick={() => setShowModal(true)}>Add Teacher</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t, index) => (
            <tr key={t.id}>
              <td>{index + 1}</td>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(t.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
};

export default Teachers;
