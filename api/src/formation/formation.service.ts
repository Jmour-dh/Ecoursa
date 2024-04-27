import { PrismaService } from './../prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateFormationDto } from './dto/createFormation.dto';
import { UpdateFormationDto } from './dto/updateFormation.dto';

@Injectable()
export class FormationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.formation.findMany({
      include: {
        cours: true,
      },
    });
  }

  async create(createFormationDto: CreateFormationDto, adminId: number) {
    // Vérifier si l'utilisateur est un administrateur
    const admin = await this.prismaService.user.findUnique({
      where: { id: adminId },
    });
    if (!admin || !admin.is_admin) {
      throw new UnauthorizedException(
        'Seuls les administrateurs peuvent créer une formation',
      );
    }

    const { title, description } = createFormationDto;
    await this.prismaService.formation.create({
      data: {
        title,
        description,
        adminId,
      },
    });
    return { data: 'La formation est bien créée' };
  }

  async delete(id: number, adminId: number) {
    const admin = await this.prismaService.user.findUnique({
      where: { id: adminId },
    });
    if (!admin || !admin.is_admin) {
      throw new UnauthorizedException(
        'Seuls les administrateurs peuvent supprimer une formation',
      );
    }
    // Vérifier si la formation existe
    const formation = await this.prismaService.formation.findUnique({
      where: { id },
    });
    if (!formation) {
      throw new NotFoundException("La formation n'existe pas");
    }
    if (formation.adminId !== adminId)
      throw new ForbiddenException('Action non autorisé');

    await this.prismaService.formation.delete({ where: { id } });
    return { data: 'La formation est bien supprimée' };
  }

  async update(
    id: number,
    adminId: number,
    updateFormationDto: UpdateFormationDto,
  ) {
    const admin = await this.prismaService.user.findUnique({
      where: { id: adminId },
    });
    if (!admin || !admin.is_admin) {
      throw new UnauthorizedException(
        'Seuls les administrateurs peuvent supprimer une formation',
      );
    }
    const formation = await this.prismaService.formation.findUnique({
      where: { id },
    });
    if (!formation) {
      throw new NotFoundException("La formation n'existe pas");
    }
    if (formation.adminId !== adminId)
      throw new ForbiddenException('Action non autorisé');

    await this.prismaService.formation.update({
      where: { id },
      data: { ...updateFormationDto },
    });
    return { data: 'La formation est bien modifiée' };
  }
}
