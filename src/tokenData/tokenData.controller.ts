import { LoanService } from "src/loan/loan.service";
import { TokenDataEntity } from "./tokenData.entity";
import { TokenDataService } from "./tokenData.service";
import { Body, Controller, Get, HttpStatus, Post, Res, Req, Param } from "@nestjs/common";
import restConfig from "src/restconfig";
import { LoanScheduleEntity } from "src/loanSchedule/loanSchedule.entity";
import { LoanScheduleService } from "src/loanSchedule/loanSchedule.service";

@Controller('tokens')
export class TokenDataController {
    constructor(private readonly tokenDataService : TokenDataService, private readonly loanService : LoanService,  private readonly loanScheduleService : LoanScheduleService){}

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
        console.log('create loan: ' + JSON.stringify(tokenDataRequest))
        const thisLoan = await this.loanService.getLoanByEmail(tokenDataRequest.email);

        const tde = new TokenDataEntity();
        tde.loanRef = thisLoan.loanRef
        tde.data = tokenDataRequest.data
        const createTokenDataResponse = await this.tokenDataService.addTokenData(tde);
        await this.loanService.updateLoan(thisLoan,tokenDataRequest.token,tokenDataRequest.tokenExpiry);


        const axios = require('axios');
        let url = "";
                if(restConfig.env == "live"){
                    url = restConfig.proxy+'?type=account&id='+thisLoan.loanAccountNumber;
                } else {
                    url = restConfig.bankOneUrl+'Loan/GetLoanRepaymentSchedule/'+restConfig.bankOneVersion+'?authtoken='+restConfig.bankOneAuthToken+'&loanAccountNumber='+thisLoan.loanAccountNumber+'&institutionCode='+restConfig.bankOneInsCode;
                }
  
                console.log(url);
                const {data} = await axios.get(url);
                console.log('received: ' + JSON.stringify(data));

                for(const n of data) {
                    const loanSchedule = new LoanScheduleEntity();

                    var onlyDay = n.PaymentDueDate.split(" ");
                    var newdatearray = onlyDay[0].split("/");
                    var newdate = newdatearray[2]+'-'+newdatearray[0]+'-'+newdatearray[1]

                    loanSchedule.loanAccountNumber = thisLoan.loanAccountNumber.toString();
                    loanSchedule.dueDate = newdate;
                    loanSchedule.dueAmount = parseFloat(n.Total.replace(/,/g, ''));

                    await this.loanScheduleService.createLoanSchedule(loanSchedule);
                }


        return ({
            code: '00',
            status: 'successful',
            message: 'TokenData updated successfully',
        })
        
    }
}