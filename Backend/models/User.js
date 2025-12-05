const userSchema = new mongoose.Schema({
  role: { 
    type: String, 
    enum: ['admin', 'teacher', 'student', 'parent'], 
    required: true 
  },

  // Login fields (depends on role)
  email: { type: String },        // Only for admin, optional for teacher
  phone: { type: String },        // Only for parent
  studentId: { type: String },    // Only for student login
  teacherId: { type: String },    // Only for teacher login

  password: { type: String, required: true }
}, { timestamps: true });
