const fs = require('fs');
const path = require('path');

const specs = [
  {
    file: 'src/modules/accounts/accounts.controller.spec.ts',
    imports: `import { AccountsService } from './accounts.service';`,
    providers: `providers: [{ provide: AccountsService, useValue: {} }],`
  },
  {
    file: 'src/modules/accounts/accounts.service.spec.ts',
    imports: `import { PrismaService } from '../../prisma/prisma.service';`,
    providers: `providers: [AccountsService, { provide: PrismaService, useValue: {} }],`
  },
  {
    file: 'src/modules/categories/categories.controller.spec.ts',
    imports: `import { CategoriesService } from './categories.service';`,
    providers: `providers: [{ provide: CategoriesService, useValue: {} }],`
  },
  {
    file: 'src/modules/categories/categories.service.spec.ts',
    imports: `import { PrismaService } from '../../prisma/prisma.service';`,
    providers: `providers: [CategoriesService, { provide: PrismaService, useValue: {} }],`
  },
  {
    file: 'src/modules/transactions/transactions.controller.spec.ts',
    imports: `import { TransactionsService } from './transactions.service';`,
    providers: `providers: [{ provide: TransactionsService, useValue: {} }],`
  },
  {
    file: 'src/modules/transactions/transactions.service.spec.ts',
    imports: `import { PrismaService } from '../../prisma/prisma.service';`,
    providers: `providers: [TransactionsService, { provide: PrismaService, useValue: {} }],`
  },
  {
    file: 'src/modules/users/users.controller.spec.ts',
    imports: `import { UsersService } from './users.service';`,
    providers: `providers: [{ provide: UsersService, useValue: {} }],`
  },
  {
    file: 'src/modules/users/users.service.spec.ts',
    imports: `import { PrismaService } from '../../prisma/prisma.service';`,
    providers: `providers: [UsersService, { provide: PrismaService, useValue: {} }],`
  },
  {
    file: 'src/modules/auth/auth.controller.spec.ts',
    imports: `import { AuthService } from './auth.service';`,
    providers: `providers: [{ provide: AuthService, useValue: {} }],`
  },
  {
    file: 'src/modules/auth/auth.service.spec.ts',
    imports: `import { UsersService } from '../users/users.service';\nimport { JwtService } from '@nestjs/jwt';`,
    providers: `providers: [AuthService, { provide: UsersService, useValue: {} }, { provide: JwtService, useValue: {} }],`
  }
];

specs.forEach(spec => {
  const filePath = path.join(__dirname, spec.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add imports
    if (!content.includes(spec.imports.split(' ')[2])) {
      content = spec.imports + '\n' + content;
    }

    // Add providers
    if (content.includes('controllers: [')) {
      content = content.replace('controllers: [', spec.providers + '\n      controllers: [');
    } else if (content.includes('providers: [')) {
      // Replace existing providers array
      const providersRegex = /providers:\s*\[[\s\S]*?\],/;
      content = content.replace(providersRegex, spec.providers);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${spec.file}`);
  }
});
