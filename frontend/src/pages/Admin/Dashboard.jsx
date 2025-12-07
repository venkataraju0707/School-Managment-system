// import React, { useState, useEffect } from 'react';
// import { Row, Col, Card, Table, Button } from 'react-bootstrap';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import { adminApi } from '../../api/adminApi';
// import AdminLayout from '../../layouts/AdminLayout';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AdminDashboard = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [recentStudents, setRecentStudents] = useState([]);

//   useEffect(() => {
//     fetchAnalytics();
//     fetchRecentStudents();
//   }, []);

//   const fetchAnalytics = async () => {
//     try {
//       const response = await adminApi.getAnalytics();
//       setAnalytics(response.data);
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//     }
//   };

//   const fetchRecentStudents = async () => {
//     try {
//       const response = await adminApi.getStudents();
//       setRecentStudents(response.data.slice(0, 5));
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const attendanceData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//     datasets: [
//       {
//         label: 'Attendance Rate (%)',
//         data: [85, 88, 90, 87, 92],
//         borderColor: 'rgb(75, 192, 192)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       },
//     ],
//   };

//   const marksData = {
//     labels: ['Math', 'Science', 'English', 'History', 'Art'],
//     datasets: [
//       {
//         label: 'Average Marks',
//         data: [85, 78, 92, 88, 75],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//         ],
//       },
//     ],
//   };

//   return (
//     <AdminLayout>
//       <div className="mb-4">
//         <h2>Admin Dashboard</h2>
//         <p className="text-muted">Welcome to School Management System</p>
//       </div>

//       {/* Stats Cards */}
//       <Row className="mb-4">
//         <Col md={3}>
//           <Card className="text-center shadow-sm">
//             <Card.Body>
//               <div className="text-primary mb-2">
//                 <i className="bi bi-people-fill fs-1"></i>
//               </div>
//               <Card.Title>Total Students</Card.Title>
//               <Card.Text className="fs-3 fw-bold">
//                 {analytics?.totalStudents || 0}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
        
//         <Col md={3}>
//           <Card className="text-center shadow-sm">
//             <Card.Body>
//               <div className="text-success mb-2">
//                 <i className="bi bi-person-badge-fill fs-1"></i>
//               </div>
//               <Card.Title>Total Teachers</Card.Title>
//               <Card.Text className="fs-3 fw-bold">
//                 {analytics?.totalTeachers || 0}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
        
//         <Col md={3}>
//           <Card className="text-center shadow-sm">
//             <Card.Body>
//               <div className="text-warning mb-2">
//                 <i className="bi bi-house-heart-fill fs-1"></i>
//               </div>
//               <Card.Title>Total Parents</Card.Title>
//               <Card.Text className="fs-3 fw-bold">
//                 {analytics?.totalParents || 0}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
        
//         <Col md={3}>
//           <Card className="text-center shadow-sm">
//             <Card.Body>
//               <div className="text-info mb-2">
//                 <i className="bi bi-building-fill fs-1"></i>
//               </div>
//               <Card.Title>Total Classes</Card.Title>
//               <Card.Text className="fs-3 fw-bold">
//                 {analytics?.totalClasses || 0}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Charts */}
//       <Row className="mb-4">
//         <Col md={6}>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title>Attendance Overview</Card.Title>
//               <div style={{ height: '300px' }}>
//                 <Line data={attendanceData} options={{ maintainAspectRatio: false }} />
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
        
//         <Col md={6}>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title>Marks Distribution</Card.Title>
//               <div style={{ height: '300px' }}>
//                 <Pie data={marksData} options={{ maintainAspectRatio: false }} />
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Recent Students */}
//       <Card className="shadow-sm">
//         <Card.Body>
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <Card.Title>Recent Students</Card.Title>
//             <Button variant="primary" size="sm">
//               View All
//             </Button>
//           </div>
          
//           <Table hover responsive>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Class</th>
//                 <th>Roll No</th>
//                 <th>Parent</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentStudents.map((student) => (
//                 <tr key={student._id}>
//                   <td>{student.studentId}</td>
//                   <td>{student.name}</td>
//                   <td>{student.class?.name || 'N/A'}</td>
//                   <td>{student.rollNumber}</td>
//                   <td>{student.parent?.name || 'N/A'}</td>
//                   <td>
//                     <Button variant="outline-primary" size="sm" className="me-2">
//                       <i className="bi bi-eye"></i>
//                     </Button>
//                     <Button variant="outline-secondary" size="sm">
//                       <i className="bi bi-pencil"></i>
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </AdminLayout>
//   );
// };

// export default AdminDashboard;
import React from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const classes = [
    { id: 1, name: "Class 1", teacher: "Mrs. Kavitha", strength: 35 },
    { id: 2, name: "Class 2", teacher: "Mr. Suresh", strength: 38 },
    { id: 3, name: "Class 3", teacher: "Ms. Divya", strength: 40 },
    { id: 4, name: "Class 4", teacher: "Mr. Anand", strength: 36 },
    { id: 5, name: "Class 5", teacher: "Ms. Rekha", strength: 34 },
    { id: 6, name: "Class 6", teacher: "Mr. Ramesh", strength: 37 },
    { id: 7, name: "Class 7", teacher: "Mrs. Sheela", strength: 39 },
    { id: 8, name: "Class 8", teacher: "Mr. Rajasekhar", strength: 32 },
    { id: 9, name: "Class 9", teacher: "Ms. Priya", strength: 33 },
    { id: 10, name: "Class 10", teacher: "Mr. Arun", strength: 30 },
  ];

  return (
    <AdminLayout>
      <h2 className="fw-bold mb-3">Super Admin Dashboard</h2>
      <p className="text-muted">Manage teachers, students, parents & classes.</p>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <i className="bi bi-people-fill fs-1 text-primary"></i>
              <h5>Total Students</h5>
              <h3 className="fw-bold">450</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <i className="bi bi-person-badge-fill fs-1 text-success"></i>
              <h5>Total Teachers</h5>
              <h3 className="fw-bold">35</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <i className="bi bi-house-fill fs-1 text-warning"></i>
              <h5>Total Parents</h5>
              <h3 className="fw-bold">450</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <i className="bi bi-columns-gap fs-1 text-info"></i>
              <h5>Total Classes</h5>
              <h3 className="fw-bold">10</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="fw-bold mb-3">Classes (1 to 10)</h4>

          <Table hover bordered responsive>
            <thead>
              <tr>
                <th>Class</th>
                <th>Class Teacher</th>
                <th>Strength</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id}>
                  <td>{cls.name}</td>
                  <td>{cls.teacher}</td>
                  <td>{cls.strength}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/admin/classStudents`)}
                    >
                      View Students →
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;

