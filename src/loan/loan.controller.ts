import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { LoanService } from "./loan.service";
import restConfig from "src/restconfig";
import { LoanEntity } from "./loan.entity";


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

        //checking if loan has been created already
        const findLoan = await this.loanService.getLoanByAcc(addRequest.loanAccountNumber);

        if(findLoan == null){
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
                    const loanEntity = new LoanEntity();
    
                    loanEntity.loanAccountNumber = addRequest.loanAccountNumber;
                    loanEntity.email = addRequest.email;
                    loanEntity.phoneNumber = addRequest.phoneNumber;
                    loanEntity.loanAmount = data.LoanAmount.toString();
                    loanEntity.repaymentInstrumentType = 'card';
    
                    const createLoanResponse = await this.loanService.createLoan(loanEntity);
                    console.log(createLoanResponse)

                    return({
                        code: '00',
                        status: 'success',
                        message: 'loan created',
                        data: createLoanResponse
                    })
    
                } else {
                    res.status(HttpStatus.BAD_REQUEST);
                    return({
                        code: '81',
                        status: 'failure',
                        message: 'loan account not found',
                    })
                }
    
            } catch (e) {
                console.log(e);
            }
        } else {
            res.status(HttpStatus.BAD_REQUEST);
            return({
                code: '82',
                status: 'failure',
                message: 'loan account already exists',
            })
        } 

    }
}
