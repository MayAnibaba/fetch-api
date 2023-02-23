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

    async getLoanByEmail(email:string): Promise<LoanEntity>{
        return await this.loanRepository.findOneBy({email: email});
    }

    async getLoanByRef(_loanRef:string): Promise<LoanEntity>{
        return await this.loanRepository.findOneBy({loanRef: _loanRef});
    }

    async getAllActiveLoansList(): Promise<LoanEntity[]>{
        return await this.loanRepository.findBy({repaymentInstrumentStatus: "active"});
    }

    async getAllActiveLoanCount(): Promise<any>{
        return await this.loanRepository.query('select count(*) as counts from loans where repaymentInstrumentStatus = "active"');
    }

    async createLoan(loanData:LoanEntity): Promise<any>{
        return await this.loanRepository.save(loanData);
    }

    async updateLoan (updateLoanRequest:LoanEntity,token:string,tokenExpiry:string) : Promise<any> {

                this.loanRepository.createQueryBuilder()
                .update(updateLoanRequest)
                .set({
                    token: token,
                    tokenExpiry: tokenExpiry,
                    repaymentInstrumentStatus: 'active',
                    getLoanSchedule: true,
                    updatedAt: new Date().toJSON()
                })
                .where("loanRef = :loanRef", {loanRef: updateLoanRequest.loanRef})
                .execute()

    }


}