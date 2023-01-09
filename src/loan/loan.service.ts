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

    async getLoanById(loanId:string): Promise<LoanEntity>{
        return await this.loanRepository.findOneBy({loanId: 'loanId'});
    }

    async createLoan(loanData:LoanEntity): Promise<any>{
        return await this.loanRepository.create(loanData);
    }

  

}