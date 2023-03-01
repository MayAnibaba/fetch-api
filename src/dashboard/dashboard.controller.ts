import { Controller, Post, Get } from "@nestjs/common";
import { get } from "http";
import { LoanService } from "src/loan/loan.service";
import { LoanScheduleService } from "src/loanSchedule/loanSchedule.service";
import restConfig from "src/restconfig";
import { TransactionService } from "src/transaction/transaction.service";
import { json } from "stream/consumers";

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


    @Get('repaymentJob')
    async cronService(){
        const repaymentsDue =  await this.loanScheduleService.getDueLoansList('2021-03-28');
        if (repaymentsDue.length > 0){
            console.log('found: ' + repaymentsDue.length + ' Due Repayments')
            let counter = 0;
            for (let i = 0; i < repaymentsDue.length; i++) {

                const loanDetails = await this.loanService.getLoanByAcc(repaymentsDue[i].loanAccountNumber);
                console.log('got loan detail: ' + JSON.stringify(loanDetails))

                //charge the amount 
                const axios = require('axios');
                const url = restConfig.paystackURL;
                const basicAuth = 'bearer ' + restConfig.paystackSecretKey;
                const payload =  {
                    email: loanDetails.email,
                    amount: repaymentsDue[i].dueAmount * 100,
                    authorization_code: loanDetails.token,
                };
                console.log(url);
                console.log(basicAuth);
                console.log(payload);

                const {data} = await axios({
                    method: "post",
                    url: url,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": basicAuth
                    },
                    data: payload                   
                }).catch((error) => {
                    console.log("axios error:",error);
                    console.log(error.response.data);
                });

                console.log('received: ' + JSON.stringify(data));

            }  

        }

        return repaymentsDue;
    }


}
