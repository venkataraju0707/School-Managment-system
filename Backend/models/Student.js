import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema({
studentId: { type: String, unique: true, required: true },
name: { type: String, required: true },
gender: { type: String },
class: { type: String },
section: { type: String },
password: { type: String, required: true },
teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
rollNumber: { type: Number }
}, { timestamps: true });


export default mongoose.model('Student', studentSchema);