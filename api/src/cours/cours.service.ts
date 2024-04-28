import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoursDto } from './dto/createCours.dto';
import { UpdateCoursDto } from './dto/updateCours.dto';

@Injectable()
export class CoursService {
  constructor(private readonly prismaService: PrismaService) {}

 async getAllByFormation(formationId: number) {
    const cours = await this.prismaService.cours.findMany({
      where: { formationId },
      include: {
        video: true,
      },
    });
    if (!cours || cours.length === 0) {
      throw new NotFoundException("Aucun cours trouvé pour cette formation");
    }
    return cours;
  }
  async create(createCoursDto: CreateCoursDto) {
    const { title, link, formationId } = createCoursDto;
    const formation = await this.prismaService.formation.findUnique({
      where: { id: formationId },
    });
    if (!formation) throw new NotFoundException("La formation n'existe pas");
    await this.prismaService.cours.create({
      data: {
        title,
        link,
        formationId,
      },
    });
    return { data: 'Le cours est bien ajouté' };
  }

  async delete(id: number, formationId: number) {
    const cours = await this.prismaService.cours.findUnique({
      where: { id, formationId },
    });
    if (!cours) {
      throw new NotFoundException("Le cours n'existe pas pour cette formation");
    }
    await this.prismaService.cours.delete({ where: { id } });
    return { data: 'Le cours est bien supprimé' };
  }

  async update(id: number, updateCoursDto: UpdateCoursDto) {
    const { title, link, formationId } = updateCoursDto;
    const cours = await this.prismaService.cours.findUnique({
      where: { id, formationId },
    });
    if (!cours) {
      throw new NotFoundException("Le cours n'existe pas pour cette formation");
    }
    await this.prismaService.cours.update({
      where: { id },
      data: {
        title,
        link,
      },
    });
    return { data: 'Le cours est bien modifié' };
  }
}
