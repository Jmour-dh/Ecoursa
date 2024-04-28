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

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, MailerModule, FormationModule, CoursModule, VideoModule, UtilsModule, ProgressionModule],
})
export class AppModule {}
