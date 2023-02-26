import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenDataController } from "./tokenData.controller";
import { TokenDataEntity } from "./tokenData.entity";
import { TokenDataService } from "./tokenData.service";
import { Module } from "@nestjs/common";
import { LoanEntity } from "src/loan/loan.entity";
import { LoanService } from "src/loan/loan.service";
import { LoanScheduleEntity } from "src/loanSchedule/loanSchedule.entity";
import { LoanScheduleService } from "src/loanSchedule/loanSchedule.service";

@Module({
    imports: [TypeOrmModule.forFeature([TokenDataEntity,LoanEntity,LoanScheduleEntity])],
    controllers: [TokenDataController],
    providers: [TokenDataService,LoanService,LoanScheduleService]
})
export class TokenDataModule{}