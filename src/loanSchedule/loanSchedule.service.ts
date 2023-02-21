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

    async getDueLoans(): Promise<LoanScheduleEntity[]> {
        const thisDataSource = new DataSource(config);
        thisDataSource.initialize();
        return await thisDataSource.manager.query(`SELECT * FROM USERS`)
    }
}