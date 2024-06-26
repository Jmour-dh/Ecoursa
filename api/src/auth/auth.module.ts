import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy.service';
import { UtilsModule } from 'src/utils/utils.module';
import { UploadService } from '../upload/upload.service';


@Module({
  imports: [  JwtModule.register({}), UtilsModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy, UploadService],
})
export class AuthModule {}
