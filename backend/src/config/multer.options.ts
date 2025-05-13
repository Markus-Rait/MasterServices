import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: join(process.cwd(), 'uploads'),
    filename: (
      _: any,
      file: { originalname: string },
      callback: (arg0: null, arg1: string) => any,
    ) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

      return callback(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
