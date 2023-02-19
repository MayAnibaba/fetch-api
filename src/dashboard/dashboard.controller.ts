import { Controller, Post } from "@nestjs/common";
import { get } from "http";
import { LoanService } from "src/loan/loan.service";

@Controller('dashboard')
export class DashboardContoller{
    constructor(private readonly loanService : LoanService,){}

    @Post()
    async dashboardData() {
        

    }


}
