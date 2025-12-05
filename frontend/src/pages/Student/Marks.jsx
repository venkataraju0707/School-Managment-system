import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const Marks = () => {
  const [marks, setMarks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ subject: '', marks: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMarks([
      { id: 1, subject: 'Math', marks: 95 },
      { id: 2, subject: 'Science', marks: 88 },
    ]);
  }, []);

  const handleSave = () => {
    if (!formData.subject || !formData.marks) return;
    setMarks([...marks, { id: Date.now(), ...formData }]);
    setFormData({ subject: '', marks: '' });
    setShowModal(false);
    setMessage('Marks added successfully!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleDelete = (id) => {
    setMarks(marks.filter((m) => m.id !== id));
    setMessage('Marks deleted!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <AdminLayout>
      <h2>Student Marks</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Button onClick={() => setShowModal(true)}>Add Marks</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((m, index) => (
            <tr key={m.id}>
              <td>{index + 1}</td>
              <td>{m.subject}</td>
              <td>{m.marks}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(m.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Marks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="number"
                value={formData.marks}
                onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
};

export default Marks;
