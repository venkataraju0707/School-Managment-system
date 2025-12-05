import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ date: '', status: 'Present' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setAttendance([
      { id: 1, date: '2025-12-01', status: 'Present' },
      { id: 2, date: '2025-12-02', status: 'Absent' },
    ]);
  }, []);

  const handleSave = () => {
    if (!formData.date) return;
    setAttendance([...attendance, { id: Date.now(), ...formData }]);
    setFormData({ date: '', status: 'Present' });
    setShowModal(false);
    setMessage('Attendance added successfully!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleDelete = (id) => {
    setAttendance(attendance.filter((a) => a.id !== id));
    setMessage('Attendance deleted!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <AdminLayout>
      <h2>Student Attendance</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Button onClick={() => setShowModal(true)}>Add Attendance</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a, index) => (
            <tr key={a.id}>
              <td>{index + 1}</td>
              <td>{a.date}</td>
              <td>{a.status}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(a.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>Present</option>
                <option>Absent</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
};

export default Attendance;
