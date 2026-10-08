import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '@prisma/client';

export class CreateAccountDto {
  @ApiProperty({ description: 'The name of the account', example: 'Nubank Credit Card' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'The type of the account', enum: AccountType, example: 'CREDIT_CARD' })
  @IsEnum(AccountType)
  @IsNotEmpty()
  type!: AccountType;

  @ApiProperty({ description: 'Initial balance of the account', example: 1000.50 })
  @IsNumber()
  @Min(0)
  balance!: number;
}
