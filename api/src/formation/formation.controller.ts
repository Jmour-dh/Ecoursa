import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FormationService } from './formation.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFormationDto } from './dto/createFormation.dto';
import { Request } from 'express';
import { UpdateFormationDto } from './dto/updateFormation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Formation')
@Controller('formations')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Get()
  getAll() {
    return this.formationService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.formationService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(
    @Body() createFormationDto: CreateFormationDto,
    @Req() request: Request,
  ) {
    const userId = request.user['id'];
    return this.formationService.create(createFormationDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    const adminId = request.user['id'];
    return this.formationService.delete(id, adminId);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFormationDto: UpdateFormationDto,
    @Req() request: Request,
  ) {
    const adminId = request.user['id'];
    return this.formationService.update(id, adminId, updateFormationDto);
  }
}
