import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProgressionService } from './progression.service';
import { CreateProgressionDto } from './dto/createProgression.dto';
import { UpdateProgressionDto } from './dto/updateProgression.dto';

@ApiTags('Progressions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('progression')
export class ProgressionController {
  constructor(private readonly progressionService: ProgressionService) {}

  @Post('create')
  create(@Body() createProgressionDto: CreateProgressionDto) {
    return this.progressionService.create(createProgressionDto);
  }

  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgressionDto: UpdateProgressionDto,
  ) {
    return this.progressionService.update(id, updateProgressionDto);
  }
}
