import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const Parents = () => {
  const [parents, setParents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setParents([
      { id: 1, name: 'Mr. John Parent', phone: '1234567890' },
      { id: 2, name: 'Mrs. Jane Parent', phone: '9876543210' },
    ]);
  }, []);

  const handleSave = () => {
    setParents([...parents, { id: Date.now(), ...formData }]);
    setFormData({ name: '', phone: '' });
    setShowModal(false);
    setMessage('Parent added!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleDelete = (id) => {
    setParents(parents.filter((p) => p.id !== id));
    setMessage('Parent deleted!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <AdminLayout>
      <h2>Parents</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Button onClick={() => setShowModal(true)}>Add Parent</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.phone}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(p.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Parent</Modal.Title>
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
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
};

export default Parents;
