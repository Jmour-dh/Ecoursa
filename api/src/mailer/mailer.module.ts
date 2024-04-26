import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { MailerService } from './mailer.service';

@Global()
@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
