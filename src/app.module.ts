import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { UserModule } from './user/user.module';
import { LoanModule } from './loan/loan.module';
import { TransactionModule } from './transaction/transaction.module';
import { LoanScheduleModule } from './loanSchedule/loanSchedule.module';


@Module({
  imports: [TypeOrmModule.forRoot(ormconfig),UserModule,LoanModule,TransactionModule,LoanScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
