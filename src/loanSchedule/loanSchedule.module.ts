import { TypeOrmModule } from "@nestjs/typeorm";
import { LoanScheduleController } from "./loanSchedule.controller";
import { LoanScheduleEntity } from "./loanSchedule.entity";
import { LoanScheduleService } from "./loanSchedule.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([LoanScheduleEntity])],
    controllers: [LoanScheduleController],
    providers: [LoanScheduleService]
})
export class LoanScheduleModule{}