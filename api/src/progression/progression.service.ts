import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProgressionDto } from './dto/createProgression.dto';
import { UpdateProgressionDto } from './dto/updateProgression.dto';

@Injectable()
export class ProgressionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProgressionDto: CreateProgressionDto) {
    const { formationId, coursId, userId, percentage } = createProgressionDto;
    const userExists = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException(
        "L'utilisateur avec l'ID spécifié n'existe pas.",
      );
    }
    const formationExists = await this.prismaService.formation.findUnique({
      where: { id: formationId },
    });
    if (!formationExists) {
      throw new NotFoundException(
        "La formation avec l'ID spécifié n'existe pas.",
      );
    }
    const coursExists = await this.prismaService.cours.findUnique({
      where: { id: coursId },
    });
    if (!coursExists) {
      throw new NotFoundException("Le cours avec l'ID spécifié n'existe pas.");
    }
    return await this.prismaService.progression.create({
      data: {
        user: {
          connect: { id: userId },
        },
        cours: {
          connect: { id: coursId },
        },
        formation: {
          connect: { id: formationId },
        },
        percentage: percentage,
      },
    });
  }

  async update(id: number, updateProgressionDto: UpdateProgressionDto) {
    const { formationId, coursId, userId, percentage } = updateProgressionDto;
    const userExists = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException(
        "L'utilisateur avec l'ID spécifié n'existe pas.",
      );
    }
    const formationExists = await this.prismaService.formation.findUnique({
      where: { id: formationId },
    });
    if (!formationExists) {
      throw new NotFoundException(
        "La formation avec l'ID spécifié n'existe pas.",
      );
    }
    const coursExists = await this.prismaService.cours.findUnique({
      where: { id: coursId },
    });
    if (!coursExists) {
      throw new NotFoundException("Le cours avec l'ID spécifié n'existe pas.");
    }
    return await this.prismaService.progression.update({
      where: { id: id },
      data: {
        user: {
          connect: { id: userId },
        },
        cours: {
          connect: { id: coursId },
        },
        formation: {
          connect: { id: formationId },
        },
        percentage: percentage,
      },
    });
  }
}
