import { Controller, Post } from "@nestjs/common";
import { get } from "http";
import { LoanService } from "src/loan/loan.service";
import { LoanScheduleService } from "src/loanSchedule/loanSchedule.service";

@Controller('dashboard')
export class DashboardContoller{

    constructor(private readonly loanService : LoanService, private readonly loanSchedule : LoanScheduleService){}

    @Post()
    async dashboardData() {
        const today = new Date()
        let date = new Date()
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let fullDate = `${day}.${month}.${year}.`;
        console.log(fullDate);

        return await this.loanSchedule.getDueLoans(fullDate);
    }


}
