const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const { auth, authorize } = require('../middleware/auth');
const Student = require('../models/Student');
const User = require('../models/User');
const AcademicRecord = require('../models/AcademicRecord');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
// Get all students (Admin/Teacher)
router.get('/', auth, authorize('admin', 'teacher'), async (req, res) => {
 try {
 const { class: studentClass, page = 1, limit = 10 } = req.query;

 const query = {};
 if (studentClass) query.class = studentClass;
 const students = await Student.find(query)
 .populate('user', 'username email profile')
 .populate('parent', 'username email profile')
 .limit(limit * 1)
 .skip((page - 1) * limit)
 .sort({ createdAt: -1 })
 const total = await Student.countDocuments(query);
 res.json({
 students,
 totalPages: Math.ceil(total / limit),
 currentPage: page,
 total
 });
 } catch (error) {
 res.status(500).json({ message: 'Server error', error: error.message });
 }
});
// Add single student
router.post('/', auth, authorize('admin', 'teacher'), async (req, res) => {
 try {
 const studentData = req.body;

 // Create user account for student
 const user = new User({
 username: studentData.studentId,
 email: studentData.email,
 password: studentData.password || 'default123',
 role: 'student',
 profile: {
 firstName: studentData.firstName,
 lastName: studentData.lastName,
 phone: studentData.phone
 }
 });
 await user.save();
 // Create student record
 const student = new Student({
 studentId: studentData.studentId,
 user: user._id,
 class: studentData.class,
 section: studentData.section,
 admissionDate: studentData.admissionDate,
 dateOfBirth: studentData.dateOfBirth,
 emergencyContact: studentData.emergencyContact
 });
 await student.save();
 res.status(201).json({ message: 'Student added successfully', student });
 } catch (error) {
 res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Upload students via Excel
router.post('/upload', auth, authorize('admin', 'teacher'), upload.single('file'), async (req, res) => {
 try {
 if (!req.file) {
 return res.status(400).json({ message: 'No file uploaded' });
 }
 const workbook = xlsx.readFile(req.file.path);
 const sheetName = workbook.SheetNames[0];
 const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
 const results = {
 successful: [],
 failed: []
 };
 for (const row of data) {
 try {
 // Create user account
 const user = new User({
 username: row.studentId,
 email: row.email,
 password: row.password || 'default123',
 role: 'student',
 profile: {
 firstName: row.firstName,
 lastName: row.lastName,
 phone: row.phone
 }
 });
 await user.save();
 // Create student record
 const student = new Student({
 studentId: row.studentId,
 user: user._id,
 class: row.class,
 section: row.section,
 admissionDate: new Date(row.admissionDate),
 dateOfBirth: new Date(row.dateOfBirth),
 emergencyContact: row.emergencyContact
 });
 await student.save();
results.successful.push(row.studentId);
 } catch (error) {
 results.failed.push({
 studentId: row.studentId,
 error: error.message
 });
 }
 }
 res.json({
 message: 'Upload completed',
 results,
 totalProcessed: data.length
 });
 } catch (error) {
 res.status(500).json({ message: 'Server error', error: error.message });
 }
});
// Get student academic records
router.get('/:id/academic-records', auth, async (req, res) => {
 try {
 const student = await Student.findOne({
 $or: [
 { studentId: req.params.id },
 { _id: req.params.id }
 ]
 });
 if (!student) {
 return res.status(404).json({ message: 'Student not found' });
 }
 // Check authorization
 if (req.user.role === 'student' && student.user.toString() !== req.user._id.toString()) {
 return res.status(403).json({ message: 'Access denied' });
 }
 if (req.user.role === 'parent' && student.parent.toString() !== req.user._id.toString())
{
 return res.status(403).json({ message: 'Access denied' });
 }
 const records = await AcademicRecord.find({ student: student._id })
 .populate('teacher', 'username profile')
 .sort({ academicYear: -1, term: 1 });
 res.json({ student, records });
 } catch (error) {
 res.status(500).json({ message: 'Server error', error: error.message });
 }
});
module.exports = router;
