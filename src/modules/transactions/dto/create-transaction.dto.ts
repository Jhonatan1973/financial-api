import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @ApiProperty({ description: 'ID of the account', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  accountId!: number;

  @ApiProperty({ description: 'ID of the category', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  categoryId!: number;

  @ApiProperty({ description: 'Type of transaction', enum: TransactionType, example: 'EXPENSE' })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type!: TransactionType;

  @ApiProperty({ description: 'Amount of the transaction', example: 50.00 })
  @IsNumber()
  @Min(0.01)
  amount!: number;

  @ApiPropertyOptional({ description: 'Optional description', example: 'Uber ride' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Date of the transaction', example: '2026-10-08T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  date!: string;
}
