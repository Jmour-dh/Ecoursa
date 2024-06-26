import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { writeFile } from 'fs/promises';
import { UploadedFile } from './interfaces/uploadFile.interface';

@Injectable()
export class UploadService {
  async uploadFile(file: UploadedFile): Promise<string> {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
    const imageUrl = `/uploads/${filename}`;

    // Enregistrement du fichier sur le disque
    const uploadPath = `../uploads/${filename}`;

    await writeFile(uploadPath, file.buffer);

    return imageUrl;
  }
}
