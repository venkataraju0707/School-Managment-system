import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    cb(null, file.fieldname + '-' + unique + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.xlsx' || ext === '.xls' || ext === '.csv') cb(null, true);
  else cb(new Error('Only Excel files are allowed'));
};

export const uploadSingle = multer({ storage, fileFilter }).single('file');
