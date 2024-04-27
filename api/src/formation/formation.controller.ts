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
import { CreateFormationDto } from './dto/createFormationDto';
import { Request } from 'express';
import { UpdateFormationDto } from './dto/updateFormationDto';

@Controller('formations')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Get()
  getAll() {
    return this.formationService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(
    @Body() createFormationDto: CreateFormationDto,
    @Req() request: Request,
  ) {
    const userId = request.user['id'];
    return this.formationService.create(createFormationDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    const adminId = request.user['id'];
    return this.formationService.delete(id, adminId);
  }

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
