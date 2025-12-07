// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { adminApi } from "../../api/adminApi";

// const ClassStudents = () => {
//   const { classId } = useParams();  
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchStudents();
//   }, [classId]); // re-fetch if class changes

//   const fetchStudents = async () => {
//     try {
//       const res = await adminApi.get(`/classes/${classId}/students`);
//       setStudents(res.data.students);
//       setLoading(false);
//     } catch (err) {
//       console.log("Error fetching class students", err);
//     }
//   };

//   const handleStudentClick = (id) => {
//     navigate(`/admin/student/${id}`);
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Class {classId} Students</h2>
//       <div className="student-list">
//         {students.map(student => (
//           <div
//             key={student._id}
//             className="student-card"
//             onClick={() => handleStudentClick(student._id)}
//           >
//             <h4>{student.name}</h4>
//             <p>Roll No: {student.rollNo}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClassStudents;
//{
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import { adminApi } from "../../api/adminApi";  // keep this for real API

// const ClassStudents = () => {
//   const { classId } = useParams();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchStudents();
//   }, [classId]);

//   const fetchStudents = async () => {
//     try {
//       // --------------------------
//       // REAL API (KEEP IT)
//       // --------------------------
//       // const res = await adminApi.get(`/classes/${classId}/students`);
//       // setStudents(res.data.students);

//       // --------------------------
//       // DUMMY DATA (FOR TESTING UI)
//       // --------------------------
//       const dummy = [
//         { _id: "1", name: "Rahul Sharma", rollNo: 5 },
//         { _id: "2", name: "Sneha Reddy", rollNo: 12 },
//         { _id: "3", name: "Arjun Patel", rollNo: 3 },
//         { _id: "4", name: "Kavya Narayan", rollNo: 9 }
//       ];

//       setStudents(dummy);
//       setLoading(false);
//     } catch (err) {
//       console.log("Error fetching class students", err);
//       setLoading(false);
//     }
//   };

//   const handleStudentClick = (id) => {
//     navigate(`/admin/student/${id}`);
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="container mt-3">
//       <h2 className="mb-3">Class {classId} - Students</h2>

//       <div className="row">
//         {students.map((student) => (
//           <div className="col-md-3 mb-3" key={student._id}>
//             <div
//               className="card shadow-sm p-3 student-card"
//               style={{ cursor: "pointer" }}
//               onClick={() => handleStudentClick(student._id)}
//             >
//               <h5 className="fw-bold">{student.name}</h5>
//               <p className="text-muted">Roll No: {student.rollNo}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClassStudents;
//}
import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
// import { adminApi } from "../../api/adminApi";  // enable later

const ClassStudents = () => {
  const [students, setStudents] = useState([
    { id: 1, rollNo: 1, name: "Rahul Sharma", age: 14, gender: "Male", totalDays: 220, presentDays: 210 },
    { id: 2, rollNo: 2, name: "Sneha Reddy", age: 13, gender: "Female", totalDays: 220, presentDays: 198 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    rollNo: "",
    name: "",
    age: "",
    gender: "",
    totalDays: "",
    presentDays: "",
  });

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  const handleAddStudent = () => {
    setStudents([...students, { id: students.length + 1, ...newStudent }]);
    setShowModal(false);

    // -------- BACKEND LATER --------
    /*
    await adminApi.post("/students", {
      classId,
      ...newStudent
    });
    */
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Class Students (Admin Only)</h3>
        <Button variant="primary" onClick={handleModalShow}>
          + Add Student
        </Button>
      </div>

      {/* TABLE */}
      <Table striped bordered hover responsive>
        <thead className="text-center">
          <tr>
            <th>
              Roll No 
              {/* <Button variant="link" onClick={handleModalShow}>➕</Button> */}
            </th>
            <th>
              Student Name 
              {/* <Button variant="link" onClick={handleModalShow}>➕</Button> */}
            </th>
            <th>
              Age 
              {/* <Button variant="link" onClick={handleModalShow}>➕</Button> */}
            </th>
            <th>
              Gender 
              {/* <Button variant="link" onClick={handleModalShow}>➕</Button> */}
            </th>
            <th>
              Total Working Days 
              {/* <Button variant="link" onClick={handleModalShow}>➕</Button> */}
            </th>
            <th>
              No. of Working Days 
              {/* <Button variant="link" onClick={handleModalShow}>➕</Button> */}
            </th>
          </tr>
        </thead>

        <tbody className="text-center">
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.rollNo}</td>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.gender}</td>
              <td>{s.totalDays}</td>
              <td>{s.presentDays}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ADD STUDENT MODAL */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Roll No</Form.Label>
              <Form.Control name="rollNo" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Age</Form.Label>
              <Form.Control name="age" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" onChange={handleChange}>
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Total Working Days</Form.Label>
              <Form.Control name="totalDays" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>No. of Working Days</Form.Label>
              <Form.Control name="presentDays" onChange={handleChange} />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAddStudent}>
            Save Student
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClassStudents;
