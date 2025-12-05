import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setSubjects([
      { id: 1, name: 'Math' },
      { id: 2, name: 'Science' },
    ]);
  }, []);

  const handleSave = () => {
    setSubjects([...subjects, { id: Date.now(), name: subjectName }]);
    setSubjectName('');
    setShowModal(false);
    setMessage('Subject added!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleDelete = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
    setMessage('Subject deleted!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <AdminLayout>
      <h2>Subjects</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Button onClick={() => setShowModal(true)}>Add Subject</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Subject Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(s.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
};

export default Subjects;
