import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();

  const { filename: image } = req.file;
  const originalImagePath = path.join('images', image);
  const webpImagePath = path.join('images', `${path.parse(image).name}.webp`);

  sharp.cache(false);

  try {
    await sharp(originalImagePath)
      .resize({
        height: 570,
        fit: 'contain',
      })
      .toFormat('webp')
      .webp({ quality: 80 })
      .toFile(webpImagePath);

    await fs.unlink(originalImagePath);

    req.file.filename = `${path.parse(image).name}.webp`;
    req.file.path = webpImagePath;

    next();
  } catch (error) {
    console.error('Error processing image:', error);
    next(error);
  }
};

export default optimizeImage;
