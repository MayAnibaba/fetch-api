import { Controller, Post } from "@nestjs/common";
import { get } from "http";
import { LoanService } from "src/loan/loan.service";
import { LoanScheduleService } from "src/loanSchedule/loanSchedule.service";

@Controller('dashboard')
export class DashboardContoller{

    constructor(private readonly loanService : LoanService, private readonly loanScheduleService : LoanScheduleService){}

    @Post()
    async dashboardData() {
        const today = new Date()
        let date = new Date()
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();

        let fullDate = `${year}-${month}-${day}.`;
        console.log(fullDate);

        const dueLoans =  await this.loanScheduleService.getDueLoanSum(fullDate);
        const activeLoans = await this.loanService.getAllActiveLoanCount();

        return ({
            dueLoan: dueLoans,
            activeLoan: activeLoans,
            successRate: '',
            collectedRepayments: '',
        })
    }


}
