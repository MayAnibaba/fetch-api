import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { LoanService } from "./loan.service";
import restConfig from "src/restconfig";


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
    async createLoan(@Body() addRequest: any, @Res({passthrough: true}) res){
        console.log('add loan request: ' + JSON.stringify(addRequest));

        try {   
            const url = restConfig.bankOneUrl+'Loan/GetLoanByAccountNumber/'+restConfig.bankOneVersion+'?authtoken='+restConfig.bankOneAuthToken+'&loanAccountNumber='+addRequest.loanAccountNumber+'&institutionCode='+restConfig.bankOneInsCode;
            console.log(url);
            const response  =  await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                //body: '{}'
            })

            const data = await response.json();
            console.log(data);

            if(data.IsSuccessful){

            } else {
                res.status(HttpStatus.BAD_REQUEST);
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
