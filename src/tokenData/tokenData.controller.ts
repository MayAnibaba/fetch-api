import { LoanService } from "src/loan/loan.service";
import { TokenDataEntity } from "./tokenData.entity";
import { TokenDataService } from "./tokenData.service";
import { Body, Controller, Get, HttpStatus, Post, Res, Req, Param } from "@nestjs/common";
import restConfig from "src/restconfig";
import { LoanScheduleEntity } from "src/loanSchedule/loanSchedule.entity";

@Controller('tokens')
export class TokenDataController {
    constructor(private readonly tokenDataService : TokenDataService, private readonly loanService : LoanService){}

    @Get(':loanRef')
    async getAllToken(@Param('loanRef') loanRef) {
        const tokens = await this.tokenDataService.getTokenByRef(loanRef);
        return ({
            code: '00',
            status: 'successful',
            message: 'listing all tokens',
            data: tokens
        })
    }

    @Post('create')
    async addTokenData(@Body() tokenDataRequest: any, @Res({passthrough: true}) res){
        console.log('Reset password: ' + JSON.stringify(tokenDataRequest))
        const thisLoan = await this.loanService.getLoanByEmail(tokenDataRequest.email);

        const tde = new TokenDataEntity();
        tde.loanRef = thisLoan.loanRef
        tde.data = tokenDataRequest.data
        const createTokenDataResponse = await this.tokenDataService.addTokenData(tde);
        await this.loanService.updateLoan(thisLoan,tokenDataRequest.token,tokenDataRequest.tokenExpiry);


        const axios = require('axios');
                const url = restConfig.bankOneUrl+'Loan/GetLoanRepaymentSchedule/'+restConfig.bankOneVersion+'?authtoken='+restConfig.bankOneAuthToken+'&loanAccountNumber='+thisLoan.loanAccountNumber+'&institutionCode='+restConfig.bankOneInsCode;
                console.log(url);

                const {data} = await axios.get(url);

                console.log('received: ' + JSON.stringify(data));

                if(data.IsSuccessful){
                    const loanSchedule = new LoanScheduleEntity();
                    
                } 


        return ({
            code: '00',
            status: 'successful',
            message: 'TokenData updated successfully',
        })
        
    }

}