import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const imageUrl = await this.uploadService.uploadFile(file);
    return {
      originalname: file.originalname,
      filename: file.filename,
      imageUrl: imageUrl,
    };
  }
}
