import multer from 'multer';

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

    const date = new Date();
    const formatWithLeadingZero = (number) => (number < 10 ? '0' : '') + number;
    const year = date.getFullYear();
    const month = formatWithLeadingZero(date.getMonth() + 1);
    const day = formatWithLeadingZero(date.getDate());
    const hours = formatWithLeadingZero(date.getHours());
    const minutes = formatWithLeadingZero(date.getMinutes());
    const seconds = formatWithLeadingZero(date.getSeconds());

    const timestamp = `${year}${month}${day}-${hours}${minutes}${seconds}`;

    callback(null, `${name}_${timestamp}.${extension}`);
  },
});

export default multer({ storage }).single('image');
