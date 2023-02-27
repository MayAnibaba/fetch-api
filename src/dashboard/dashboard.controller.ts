import { Controller, Post, Get } from "@nestjs/common";
import { get } from "http";
import { LoanService } from "src/loan/loan.service";
import { LoanScheduleService } from "src/loanSchedule/loanSchedule.service";
import { TransactionService } from "src/transaction/transaction.service";

@Controller('dashboard')
export class DashboardContoller{

    constructor(private readonly loanService : LoanService, private readonly loanScheduleService : LoanScheduleService, private readonly transactionService : TransactionService){}

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
        const collectedRepayments = await this.transactionService.getAllTodaySum(fullDate)

        return ({
            dueLoan: dueLoans[0].total,
            activeLoan: activeLoans[0].counts,
            collectedRepayments: collectedRepayments[0].total,
        })
    }


    @Get()
    async cronService(){
        const repaymentsDue =  await this.loanScheduleService.getDueLoansList('2021-03-28');
        console.log('Repayment list: '+repaymentsDue)
        return repaymentsDue;
    }


}
