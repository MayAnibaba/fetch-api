import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoanScheduleEntity } from "./loanSchedule.entity";
import { Repository, DataSource } from "typeorm";
import config from "src/ormconfig";

@Injectable()
export class LoanScheduleService {
    constructor(@InjectRepository(LoanScheduleEntity)private readonly loanScheduleRepository: Repository<LoanScheduleEntity>){}

    async getScheduleByAcc(loanRef:string): Promise<LoanScheduleEntity[]>{
        return await this.loanScheduleRepository.findBy({loanId: loanRef});
    }

    async getDueLoansCount(thisDate:string): Promise<LoanScheduleEntity[]> {

        const sql = 'select count(*) from loanSchedule where Date(dueDate) = "'+ thisDate + '"';
        console.log(sql);
        return await this.loanScheduleRepository.query(sql);

    }

    async getDueLoanSum(thisDate:string): Promise<any> {
        const sql = 'select sum(dueAmount) as total from loanSchedule where Date(dueDate) = "'+ thisDate + '"';
        console.log(sql);
        return await this.loanScheduleRepository.query(sql);
    }

    async getDueLoansList(thisDate:string): Promise<LoanScheduleEntity[]> {

        const sql = 'select * from loanSchedule where Date(dueDate) = "'+ thisDate + '"';
        console.log(sql);
        return await this.loanScheduleRepository.query(sql);

    }
}