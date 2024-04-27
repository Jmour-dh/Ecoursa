import { Module } from '@nestjs/common';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';

@Module({
  providers: [FormationService],
  controllers: [FormationController]
})
export class FormationModule {}
