import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets/images/user'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
})

const upload = multer({storage})

export default upload;