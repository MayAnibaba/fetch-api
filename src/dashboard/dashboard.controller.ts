import { Controller, Post } from "@nestjs/common";
import { get } from "http";
import { LoanService } from "src/loan/loan.service";
import { LoanScheduleService } from "src/loanSchedule/loanSchedule.service";

@Controller('dashboard')
export class DashboardContoller{

    constructor(private readonly loanService : LoanService, private readonly loanSchedule : LoanScheduleService){}

    @Post()
    async dashboardData() {
        return await this.loanSchedule.getDueLoans();
    }


}
