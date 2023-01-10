import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { LoanService } from "./loan.service";
import { HttpModule } from "@nestjs/axios";


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
    async createLoan(@Body() addRequest: any, @Res() addResponse: any){
        console.log('add loan request: ' + JSON.stringify(addRequest));

        try {   
            const response  =  await fetch('http://52.168.85.231/BankOneWebAPI/api/Loan/GetLoanByID/2?authtoken=e226bce9-c861-4eab-9a2e-cece85b3615b&loanID=05690013022002889', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                //body: '{}'
            })

            const data = await response.json();
            console.log(data);
            console.log(data.IsSuccessful);

            if(data.IsSuccessful){

            } else {
                
            }

        } catch (e) {
            console.log(e);
        }

       

        

        

    }
}
