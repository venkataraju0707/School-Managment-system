import mongoose from 'mongoose';


const parentSchema = new mongoose.Schema({
name: { type: String, required: true },
password: { type: String, required: true },
studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
}, { timestamps: true });


export default mongoose.model('Parent', parentSchema);