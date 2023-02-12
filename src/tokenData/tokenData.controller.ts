import { LoanService } from "src/loan/loan.service";
import { TokenDataEntity } from "./tokenData.entity";
import { TokenDataService } from "./tokenData.service";
import { Body, Controller, Get, HttpStatus, Post, Res, Req, Param } from "@nestjs/common";

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

        return ({
            code: '00',
            status: 'successful',
            message: 'TokenData updated successfully',
        })
        
    }

}