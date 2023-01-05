import { Controller, Get } from "@nestjs/common";
import { LoanService } from "./loan.service";

@Controller('loans')
export class LoanController {
    constructor(private readonly loanService : LoanService){}

    @Get()
    async getAllLoans() {
        return this.loanService.getAllLoans();
    }
}
