import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { AccountsModule } from './modules/accounts/accounts.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, CategoriesModule, TransactionsModule, AccountsModule],
})
export class AppModule {}