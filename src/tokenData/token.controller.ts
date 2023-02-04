import { TokenDataEntity } from "./tokenData.entity";
import { TokenDataService } from "./tokenData.service";
import { Body, Controller, Get, HttpStatus, Post, Res, Req, Param } from "@nestjs/common";

@Controller('token')
export class TokenController {
    constructor(private readonly tokenDataService : TokenDataService){}

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
    async addTokenData(@Body() tokenDataRequest: TokenDataEntity, @Res({passthrough: true}) res){
        console.log('Reset password: ' + JSON.stringify(tokenDataRequest))
        const passwordResponse = await this.tokenDataService.addTokenData(tokenDataRequest);
    }

}