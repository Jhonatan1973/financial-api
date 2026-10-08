import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({ status: 201, description: 'Account created successfully.' })
  create(@Body() createAccountDto: CreateAccountDto, @Request() req: any) {
    const userId = req.user.sub;
    return this.accountsService.create(userId, createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all accounts for the authenticated user' })
  findAll(@Request() req: any) {
    const userId = req.user.sub;
    return this.accountsService.findAllByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account by id' })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const userId = req.user.sub;
    return this.accountsService.findOne(userId, id);
  }
}
