import { Module } from '@nestjs/common';
import { AuthModule } from '@shared/auth';
import { AppService } from './app.service';
import { UsersModule } from '@shared/users';
import { IncomeModule } from '@core/income';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@shared/prisma';
import { AppController } from './app.controller';
import { CommitteeModule } from '@core/committee';
import { ReceiptBookModule } from '@core/receipt-book';
import { ActivityLogModule } from '@shared/activity-log';
import { ExpenseModule } from '@core/expense/expense.module';
import { OrganizationModule } from '@owner/organization/index';
import { CategoryModule } from '@core/category/category.module';
import { UserOrganizationModule } from '@owner/user-organization';
import { AuthorizedOrgMemberModule } from '@core/authorized-org-member';
import { UserSessionModule, UserSessionService } from '@shared/user-session';
import { SubCommitteeModule } from '@core/sub-committee/sub-committee.module';
import { FiscalYearModule } from './modules/core/fiscal-year/fiscal-year.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UsersModule,
    PrismaModule,
    UserSessionModule,
    OrganizationModule,
    UserOrganizationModule,
    CommitteeModule,
    SubCommitteeModule,
    AuthorizedOrgMemberModule,
    CategoryModule,
    ExpenseModule,
    IncomeModule,
    ActivityLogModule,
    ReceiptBookModule,
    FiscalYearModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserSessionService],
})
export class AppModule {}
