import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoanService } from "./loan.service";
import { Response as Res } from "express";


@Controller('loans')
export class LoanController {
    constructor(private readonly loanService : LoanService){}

    @Get()
    async getAllLoans() {
        const loans = await this.loanService.getAllLoans();
        return ({
            code: '00',
            status: 'successful',
            message: 'listing all loans',
            data: loans
        })
    }

    @Post('add')
    async createLoan(@Body() addRequest: any, res: Res){
        console.log('add loan request: ' + JSON.stringify(addRequest));

        try {   
            const response  =  await fetch('http://52.168.85.231/BankOneWebAPI/api/Loan/GetLoanByID/2?authtoken=e226bce9-c861-4eab-9a2e-cece85b3615b&loanID=05690013022002889', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                //body: '{}'
            })

            const data = await response.json();
            console.log(data);

            if(data.IsSuccessful){

            } else {
                //res.status(400);
                return({
                    code: '81',
                    status: 'failure',
                    message: 'loan Id not found',
                })
            }

        } catch (e) {
            console.log(e);
        }

       

        

        

    }
}
