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
        console.log('add loan request: ' + addRequest.email);

    }
}
