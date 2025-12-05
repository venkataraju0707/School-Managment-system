import React, { useState, useEffect } from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import { Table, Form, Button, Alert } from 'react-bootstrap';

const Marks = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setStudents([
      { id: 1, name: 'John Doe', marks: 85 },
      { id: 2, name: 'Jane Smith', marks: 92 },
      { id: 3, name: 'Alice Johnson', marks: 78 },
    ]);
  }, []);

  const updateMarks = (id, newMarks) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, marks: Number(newMarks) } : student
      )
    );
    setMessage('Marks updated!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <TeacherLayout>
      <h2>Marks</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Marks</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>
                <Form.Control
                  type="number"
                  value={student.marks}
                  onChange={(e) => updateMarks(student.id, e.target.value)}
                />
              </td>
              <td>
                <Button variant="primary" onClick={() => setMessage('Marks saved!')}>
                  Save
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TeacherLayout>
  );
};

export default Marks;
