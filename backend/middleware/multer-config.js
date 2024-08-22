import multer from 'multer';
import { nanoid } from 'nanoid';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .split(' ')
      .join('_')
      .split('.')
      .slice(0, -1)
      .join('.');
    const extension = MIME_TYPES[file.mimetype];

    const uniqueId = nanoid();
    callback(null, `${name}_${uniqueId}.${extension}`);
  },
});

export default multer({ storage }).single('image');
