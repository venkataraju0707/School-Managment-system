const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teacherId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number },
  classAssigned: { type: String },
  sectionAssigned: { type: String },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }]
}, { timestamps: true });

module.exports = mongoose.model("Teacher", teacherSchema);
