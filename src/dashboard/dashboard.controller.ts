import { Controller, Post, Get } from "@nestjs/common";
import { get } from "http";
import { LoanService } from "src/loan/loan.service";
import { LoanScheduleService } from "src/loanSchedule/loanSchedule.service";
import transporter from "src/mailconfig";
import restConfig from "src/restconfig";
import { TransactionEntity } from "src/transaction/transaction.entity";
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
        const collectedRepayments = await this.transactionService.getAllSum();

        return ({
            dueLoan: dueLoans[0].total,
            activeLoan: activeLoans[0].counts,
            collectedRepayments: collectedRepayments[0].total / 100,
        })
    }

    @Get('repaymentJob')
    async cronService(){
        const yourDate = new Date()
        yourDate.toISOString().split('T')[0]
        //get for today
        const repaymentsDue =  await this.loanScheduleService.getDueLoansList(yourDate.toISOString().split('T')[0]);
        if (repaymentsDue.length > 0){
            console.log('found: ' + repaymentsDue.length + ' Due Repayments')
            let counter = 0;
            
            //loop repayments
            for (let i = 0; i < repaymentsDue.length; i++) {

                const loanDetails = await this.loanService.getLoanByAcc(repaymentsDue[i].loanAccountNumber);
                console.log('got loan detail: ' + JSON.stringify(loanDetails))
                const thisTrans = new TransactionEntity();

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

                    thisTrans.amount = 0;
                    thisTrans.scheduleRef = repaymentsDue[i].scheduleRef;
                    thisTrans.status = 'failed';
                    thisTrans.code = '91';
                    thisTrans.message = error;
                    thisTrans.data = error.response.data;
                    this.transactionService.addTransaction(thisTrans);
                });

                if(data.status){
                    //charge successfull 
                    thisTrans.amount = data.data.amount;
                    thisTrans.scheduleRef = repaymentsDue[i].scheduleRef;
                    thisTrans.status = 'success';
                    thisTrans.code = '00';
                    thisTrans.message = data.message;
                    thisTrans.data = JSON.stringify(data);
                    this.transactionService.addTransaction(thisTrans);
                    this.loanScheduleService.updateLoanSchedule(repaymentsDue[i],'success',(data.data.amount / 100).toString());
                }
                console.log('received: ' + JSON.stringify(data));
            }  

        }

        return 'success';
    }

    @Get('email')
    async sendEmail(){

        try {

            let info = await transporter.sendMail({
                from: '"Sofri MFB" <noreply@noreply.com>', // sender address
                to: "codegidi@live.com, mayowa.anibaba@gmail.com", // list of receivers
                subject: "Update on your application", // Subject line
                text: "Add your replayment instrument: ", // plain text body
                html: "Add your replayment instrument: <a href=''>click here</a>", // html body
            });

            return 'done';
        } catch(Exception) {
            console.log(Exception.message);
            return Exception.message;
        }

        

    }




}
