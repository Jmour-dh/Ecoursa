import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/createVideo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateVideoDto } from './dto/updateVideo.dto';

@Injectable()
export class VideoService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createVideoDto: CreateVideoDto) {
    const { title, link, coursId } = createVideoDto;
    const cours = await this.prismaService.cours.findUnique({
      where: { id: coursId },
    });
    if (!cours) throw new NotFoundException("le cours n'existe pas");
    await this.prismaService.video.create({
      data: {
        title,
        link,
        coursId,
      },
    });
    return { data: 'la video est bien ajoutée' };
  }

  async delete(id: number, coursId: number) {
    const video = await this.prismaService.video.findUnique({
      where: { id, coursId },
    });
    if (!video) throw new NotFoundException("la video n'existe pas");
    await this.prismaService.video.delete({ where: { id } });
    return { data: 'la video est bien supprimée' };
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    const { title, link, coursId } = updateVideoDto;
    const video = await this.prismaService.video.findUnique({
      where: { id, coursId },
    });
    if (!video) throw new NotFoundException("la video n'existe pas");
    await this.prismaService.video.update({
      where: { id },
      data: {
        title,
        link,
      },
    });
    return { data: 'la video est bien modifiée' };
  }

  findAll(coursId: number) {
    return this.prismaService.video.findMany({ where: { coursId } });
  }
}
