import { Module } from "@nestjs/common";
import { LoanEntity } from "src/loan/loan.entity";
import { TransactionEntity } from "src/transaction/transaction.entity";
import { DashboardContoller } from "./dashboard.controller";
import { TransactionService } from "src/transaction/transaction.service";
import { LoanService } from "src/loan/loan.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoanScheduleEntity } from "src/loanSchedule/loanSchedule.entity";
import { LoanScheduleService } from "src/loanSchedule/loanSchedule.service";
import { LogService } from "src/log/log.service";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity,LoanEntity,LoanScheduleEntity,LogService])],
    controllers: [DashboardContoller],
    providers: [TransactionService,LoanService,LoanScheduleService,LogService]
})
export class DashboardModule{}