import { Controller, Get, Post, Body, Query, UseGuards, Request, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction (Income or Expense)' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully.' })
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req: any) {
    const userId = req.user.sub;
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'List transactions with pagination and filters' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'type', required: false, enum: ['INCOME', 'EXPENSE'] })
  findAll(
    @Request() req: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('categoryId') categoryId?: string,
    @Query('type') type?: 'INCOME' | 'EXPENSE',
  ) {
    const userId = req.user.sub;
    return this.transactionsService.findAllByUser(userId, {
      page,
      limit,
      categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
      type,
    });
  }

  @Get('report')
  @ApiOperation({ summary: 'Get a monthly financial report' })
  @ApiQuery({ name: 'month', required: true, example: '2026-10', description: 'Year and month' })
  getReport(@Query('month') month: string, @Request() req: any) {
    const userId = req.user.sub;
    return this.transactionsService.getMonthlyReport(userId, month);
  }
}
