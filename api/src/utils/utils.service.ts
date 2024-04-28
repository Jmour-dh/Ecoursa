import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UtilsService {
  constructor(private readonly prismaService: PrismaService) {}

  async isAdmin(userId: number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });
    return user && user.is_admin;
  }

  async isUserRegistered(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return !!user;
  }
}
