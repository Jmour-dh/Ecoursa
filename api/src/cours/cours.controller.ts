import {
  Controller,
  UseGuards,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { CoursService } from './cours.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCoursDto } from './dto/createCours.dto';
import { UpdateCoursDto } from './dto/updateCours.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Cours')
@Controller('cours')
export class CoursController {
  constructor(private readonly coursService: CoursService) {}

  @Get('/:formationId')
  getAllByFormation(@Param('formationId', ParseIntPipe) formationId: number) {
    return this.coursService.getAllByFormation(formationId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createCoursDto: CreateCoursDto) {
    return this.coursService.create(createCoursDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Body('formationId') formationId: number,
  ) {
    return this.coursService.delete(id, formationId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoursDto: UpdateCoursDto,
  ) {
    return this.coursService.update(id, updateCoursDto);
  }
}
