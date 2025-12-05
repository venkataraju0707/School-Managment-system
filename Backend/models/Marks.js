const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  marksObtained: { type: Number, required: true },
  maxMarks: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Marks", marksSchema);
