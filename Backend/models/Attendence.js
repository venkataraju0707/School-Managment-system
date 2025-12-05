const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present","Absent"], required: true },
  uploadedByAdmin: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
