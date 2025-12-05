import mongoose from 'mongoose';
const uploadLogSchema = new mongoose.Schema({
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['MARKS','ATTENDANCE'] },
  filePath: { type: String },
  totalRecords: Number,
  successCount: Number,
  failureCount: Number,
  failures: { type: Array, default: [] }
}, { timestamps: true });
export default mongoose.model('UploadLog', uploadLogSchema);
