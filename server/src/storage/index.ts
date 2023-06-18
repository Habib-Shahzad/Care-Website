// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

import { diskStorage } from 'multer';

const env = process.env.ENV_NAME;
const path1 = path.resolve('../client/public/allImages');
const path2 = path.resolve('build/allImages');
const uploadPath = env === 'dev' ? path1 : path2;

export const myStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  },
});
