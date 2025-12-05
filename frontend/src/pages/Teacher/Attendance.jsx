import React, { useState, useEffect } from 'react';
import TeacherLayout from '../../layouts/TeacherLayout';
import { Table, Button, Form, Alert } from 'react-bootstrap';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  // Example: fetch students from API (placeholder)
  useEffect(() => {
    setStudents([
      { id: 1, name: 'John Doe', present: true },
      { id: 2, name: 'Jane Smith', present: false },
      { id: 3, name: 'Alice Johnson', present: true },
    ]);
  }, []);

  const toggleAttendance = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
    setMessage('Attendance updated!');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <TeacherLayout>
      <h2>Attendance</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.present ? 'Present' : 'Absent'}</td>
              <td>
                <Button
                  variant={student.present ? 'danger' : 'success'}
                  onClick={() => toggleAttendance(student.id)}
                >
                  {student.present ? 'Mark Absent' : 'Mark Present'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TeacherLayout>
  );
};

export default Attendance;
