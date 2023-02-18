import { Module } from "@nestjs/common";
import { LoanEntity } from "src/loan/loan.entity";
import { TransactionEntity } from "src/transaction/transaction.entity";
import { DashboardContoller } from "./dashboard.controller";
import { TransactionService } from "src/transaction/transaction.service";
import { LoanService } from "src/loan/loan.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity,LoanEntity])],
    controllers: [DashboardContoller],
    providers: [TransactionService,LoanService]
})
export class TokenDataModule{}