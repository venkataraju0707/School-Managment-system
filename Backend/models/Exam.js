const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examName: { type: String, required: true },     // Midterm, Final, etc.
  class: { type: String, required: true },        // e.g., 10th, 12th
  section: { type: String },                      // optional if section-wise
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, 
  subjects: [                                     // dynamic subjects array
    {
      subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
      maxMarks: { type: Number, required: true }  // customized marks per subject
    }
  ],
  totalMarks: { type: Number },                   // optional, can be calculated dynamically
  examDate: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);
