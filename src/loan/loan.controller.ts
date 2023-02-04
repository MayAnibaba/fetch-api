import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { LoanService } from "./loan.service";
import restConfig from "src/restconfig";
import { LoanEntity } from "./loan.entity";
import transporter from  "src/mailconfig";
import nodemailer from "nodemailer";


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

    @Post('byLoanRef')
    async getByLoanRef(@Body() loanRefRequest: any, @Res({passthrough: true}) res){
        const findLoan = await this.loanService.getLoanByRef(loanRefRequest.loanRef);
        if(findLoan != null){
            return ({
                code: '00',
                status: 'successful',
                message: 'listing loan',
                data: findLoan
            })
        } else {
            return({
                code: '81',
                status: 'failure',
                message: 'loan account not found',
            })
        }
    }

    @Post('add')
    async createLoan(@Body() addRequest: any, @Res({passthrough: true}) res){
        console.log('add loan request: ' + JSON.stringify(addRequest));

        //checking if loan has been created already
        const findLoan = await this.loanService.getLoanByAcc(addRequest.loanAccountNumber);

        if(findLoan == null){
            try {   
                
                //const data = await this.loanService.getLoanFormCBA(addRequest.loanAccountNumber);
                const axios = require('axios');
                const url = restConfig.bankOneUrl+'Loan/GetLoanByAccountNumber/'+restConfig.bankOneVersion+'?authtoken='+restConfig.bankOneAuthToken+'&loanAccountNumber='+addRequest.loanAccountNumber+'&institutionCode='+restConfig.bankOneInsCode;
                console.log(url);

                const {data} = await axios.get(url);

                // const response  =  await fetch(url, {
                //     method: 'GET',
                //     headers: {'Content-Type': 'application/json'},
                //     //body: '{}'
                // })
    
                //const data = await response.json();
                console.log('received: ' + JSON.stringify(data));
                //const dataObj = JSON.parse(data);
    
                if(data.IsSuccessful){
                    const loanEntity = new LoanEntity();
                    Object.assign(loanEntity,addRequest);

                    loanEntity.loanAmount = data.LoanAmount.toString();
                    loanEntity.repaymentInstrumentType = 'card';
    
                    const createLoanResponse = await this.loanService.createLoan(loanEntity);
                    console.log(createLoanResponse)

                    const paystrackUrl = restConfig.webPaystackURl + createLoanResponse.loanRef;


                      // send mail with defined transport object
                        let info = await transporter.sendMail({
                            from: '"Sofri MFB" <noreply@noreply.com>', // sender address
                            to: "codegidi@live.com, "+ addRequest.email, // list of receivers
                            subject: "Update on your application", // Subject line
                            text: "Add your replayment instrument: " + paystrackUrl, // plain text body
                            html: "Add your replayment instrument: <a href='"+paystrackUrl+"'>click here</a>", // html body
                        });

                        console.log("Message sent: %s", info.messageId);
                        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                    return({
                        code: '00',
                        status: 'success',
                        message: 'loan created',
                        paystackUrl: paystrackUrl,
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
