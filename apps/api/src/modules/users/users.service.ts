import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/api/modules/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(UsersService.name);

  public async verifyUser(username: string): Promise<void> {
    await this.prisma.user.update({
      data: {
        isVerified: true,
      },
      where: {
        username,
      },
    });
  }

  public async findUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  public async updateUserCurrentChallenge(username: string, newChallenge: string): Promise<User> {
    return this.prisma.user.update({
      data: {
        currentChallenge: newChallenge,
      },
      where: {
        username,
      },
    });
  }

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const alreadyExistsErrorMsg = 'User already exists';
          this.logger.error(alreadyExistsErrorMsg);
          throw new ConflictException(alreadyExistsErrorMsg);
        }
      }

      throw error;
    }
  }

  public async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
