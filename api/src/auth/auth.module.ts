import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy.service';
import { UtilsModule } from 'src/utils/utils.module';


@Module({
  imports: [  JwtModule.register({}), UtilsModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
