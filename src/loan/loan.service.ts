import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoanEntity } from "./loan.entity";
import { Repository } from "typeorm";

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

  

}