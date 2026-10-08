import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionType } from '@prisma/client';

export interface FindAllFilters {
  page: number;
  limit: number;
  categoryId?: number;
  type?: TransactionType;
}

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a transaction.
   * Also updates the associated account balance.
   */
  async create(userId: number, createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { accountId, categoryId, amount, date, description, type } = createTransactionDto;

    // Verify if account belongs to user
    const account = await this.prisma.account.findFirst({
      where: { id: accountId, userId },
    });

    if (!account) {
      throw new NotFoundException('Account not found or does not belong to the user');
    }

    // Verify if category exists
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Use a transaction to ensure data integrity
    return this.prisma.$transaction(async (prisma) => {
      // 1. Create the transaction
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          accountId,
          categoryId,
          type,
          amount,
          date: new Date(date),
          description,
        },
      });

      // 2. Update the account balance
      const balanceChange = type === 'INCOME' ? amount : -amount;
      await prisma.account.update({
        where: { id: accountId },
        data: {
          balance: {
            increment: balanceChange,
          },
        },
      });

      return transaction;
    });
  }

  /**
   * Retrieves all transactions for the user with pagination and filters.
   */
  async findAllByUser(userId: number, filters: FindAllFilters) {
    const { page, limit, categoryId, type } = filters;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (categoryId) where.categoryId = categoryId;
    if (type) where.type = type;

    const [total, data] = await Promise.all([
      this.prisma.transaction.count({ where }),
      this.prisma.transaction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          category: true,
          account: true,
        },
      }),
    ]);

    return {
      total,
      page,
      lastPage: Math.ceil(total / limit),
      data,
    };
  }

  /**
   * Generate a monthly report summarizing income and expenses.
   * Format of month: 'YYYY-MM'
   */
  async getMonthlyReport(userId: number, yearMonth: string) {
    const [year, month] = yearMonth.split('-');
    
    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);

    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: { category: true }
    });

    let totalIncome = 0;
    let totalExpense = 0;
    const categoriesSum: Record<string, number> = {};

    transactions.forEach(t => {
      const amount = Number(t.amount);
      if (t.type === 'INCOME') {
        totalIncome += amount;
      } else {
        totalExpense += amount;
      }

      const catName = t.category.name;
      categoriesSum[catName] = (categoriesSum[catName] || 0) + amount;
    });

    return {
      period: yearMonth,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      breakdownByCategory: categoriesSum,
    };
  }
}
