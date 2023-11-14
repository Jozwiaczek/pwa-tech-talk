import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Prisma, RefreshToken } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';

export type RefreshTokenCreateInput = Prisma.XOR<
  Prisma.RefreshTokenCreateInput,
  Prisma.RefreshTokenUncheckedCreateInput
>;

@Injectable()
export class RefreshTokenService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly logger = new Logger(RefreshTokenService.name);

  public async create(data: RefreshTokenCreateInput): Promise<RefreshToken> {
    try {
      return await this.prismaService.refreshToken.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const alreadyExistsErrorMessage = 'Refresh token already exists';
          this.logger.error(`Create - ${alreadyExistsErrorMessage}`);
          throw new ConflictException(alreadyExistsErrorMessage);
        }
      }

      this.logger.error('Create - Unknown error');
      throw error;
    }
  }

  public async findFirstOrThrow(where: Prisma.RefreshTokenWhereInput): Promise<RefreshToken> {
    try {
      return await this.prismaService.refreshToken.findFirstOrThrow({ where });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          const notFoundErrorMessage = 'Refresh token not found';
          this.logger.error(`Find one or fail - ${notFoundErrorMessage}`);
          throw new ConflictException(notFoundErrorMessage);
        }
      }

      this.logger.error('Find one or fail - Unknown error');
      throw error;
    }
  }

  public async delete(where: Prisma.RefreshTokenWhereUniqueInput): Promise<RefreshToken> {
    try {
      return await this.prismaService.refreshToken.delete({ where });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          const notFoundErrorMessage = 'Refresh token not found';
          this.logger.error(`Delete - ${notFoundErrorMessage}`);
          throw new ConflictException(notFoundErrorMessage);
        }
      }

      this.logger.error('Delete - Unknown error');
      throw error;
    }
  }

  public async deleteAllExpired(userId: string): Promise<Prisma.BatchPayload> {
    return await this.deleteMany({
      userId,
      expirationDate: { lte: new Date() },
    });
  }

  public async deleteMany(where: Prisma.RefreshTokenWhereInput): Promise<Prisma.BatchPayload> {
    try {
      return await this.prismaService.refreshToken.deleteMany({ where });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          const notFoundErrorMessage = 'Refresh token not found';
          this.logger.error(`Delete many - ${notFoundErrorMessage}`);
          throw new ConflictException(notFoundErrorMessage);
        }
      }

      this.logger.error('Delete many - Unknown error');
      throw error;
    }
  }
}
