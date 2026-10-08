import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from '@prisma/client';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates an account for a specific user.
   */
  async create(userId: number, createAccountDto: CreateAccountDto): Promise<Account> {
    const existing = await this.prisma.account.findUnique({
      where: {
        userId_name: {
          userId,
          name: createAccountDto.name,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Account with this name already exists for the user');
    }

    return this.prisma.account.create({
      data: {
        ...createAccountDto,
        userId,
      },
    });
  }

  /**
   * Lists all accounts belonging to a specific user.
   */
  async findAllByUser(userId: number): Promise<Account[]> {
    return this.prisma.account.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Retrieves a specific account for a user.
   */
  async findOne(userId: number, id: number): Promise<Account> {
    const account = await this.prisma.account.findFirst({
      where: { id, userId },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found for this user`);
    }

    return account;
  }
}
