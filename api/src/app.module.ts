import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { FormationModule } from './formation/formation.module';
import { CoursModule } from './cours/cours.module';
import { VideoModule } from './video/video.module';
import { UtilsModule } from './utils/utils.module';
import { ProgressionModule } from './progression/progression.module';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { UploadService } from './upload/upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    MailerModule,
    FormationModule,
    CoursModule,
    VideoModule,
    UtilsModule,
    ProgressionModule,
    UploadModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class AppModule {}
