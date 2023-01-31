import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoanEntity } from "./loan.entity";
import { Repository } from "typeorm";
import restConfig from "src/restconfig";

@Injectable()
export class LoanService{
    constructor(@InjectRepository(LoanEntity)private readonly loanRepository: Repository<LoanEntity>){}

    async getAllLoans(): Promise<LoanEntity[]>{
        return await this.loanRepository.find();
    }

    async getLoanByAcc(loanAcc:string): Promise<LoanEntity>{
        return await this.loanRepository.findOneBy({loanAccountNumber: loanAcc});
    }

    async getLoanByRef(_loanRef:string): Promise<LoanEntity>{
        return await this.loanRepository.findOneBy({loanRef: _loanRef});
    }

    async createLoan(loanData:LoanEntity): Promise<any>{
        return await this.loanRepository.save(loanData);
    }

    // async getLoanFormCBA(loanAccountNumber: string): Promise<any>{


    //     const url = restConfig.bankOneUrl+'Loan/GetLoanByAccountNumber/'+restConfig.bankOneVersion+'?authtoken='+restConfig.bankOneAuthToken+'&loanAccountNumber='+loanAccountNumber+'&institutionCode='+restConfig.bankOneInsCode;
    //     console.log(url);
        
    //     const https = require('http');

    //     await https.get(url, async (resp) => {
    //         let data = '';
    //         for await (const chunk of resp) {
    //             data += chunk;
    //         }

    //         // resp.on('end', ()=>{
    //         //     console.log(JSON.parse(data));
    //         //     return JSON.parse(data);
    //         //     // console.log(data);
    //         //     // return data;
    //         // })

    //     }).on("error", (err) => {
    //         console.log("Error: " + err.message);
    //         return 'error'
    //     })
    // }


    // getLoanFormCBA(loanAccountNumber: string){
    //     return new Promise ((resolve, reject)=> {
    //     const url = restConfig.bankOneUrl+'Loan/GetLoanByAccountNumber/'+restConfig.bankOneVersion+'?authtoken='+restConfig.bankOneAuthToken+'&loanAccountNumber='+loanAccountNumber+'&institutionCode='+restConfig.bankOneInsCode;
    //     console.log(url);
    //     const https = require('http');

    //     await https.get(url, (resp) => {
    //         let data = '';

    //         resp.on('data', (chunk)=>{
    //             data += chunk;
    //         })

    //         resp.on('end', ()=>{
    //             console.log(JSON.parse(data));
    //             resolve JSON.parse(data);
    //             // console.log(data);
    //             // return data;
    //         })

    //     }).on("error", (err) => {
    //         console.log("Error: " + err.message);
    //         reject 'error'
    //     })
    // })
    // }
  

}