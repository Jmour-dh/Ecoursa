import { Module } from '@nestjs/common';
import { ProgressionService } from './progression.service';
import { ProgressionController } from './progression.controller';

@Module({
  providers: [ProgressionService],
  controllers: [ProgressionController]
})
export class ProgressionModule {}
