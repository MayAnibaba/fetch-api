import { Body, Controller, Post, Res } from "@nestjs/common";
import { LoanScheduleService } from "./loanSchedule.service";

@Controller('loanSchedules')
export class LoanScheduleController {
    constructor(private readonly loanScheduleService : LoanScheduleService){}


    @Post('byLoanRef')
    async getByLoanRef(@Body() loanScheduleRequest: any, @Res({passthrough: true}) res){
        const findSchedule = await this.loanScheduleService.getScheduleByAcc(loanScheduleRequest.loanRef);
            return ({
                code: '00',
                status: 'successful',
                message: 'listing loan',
                data: findSchedule
            })
    }
}