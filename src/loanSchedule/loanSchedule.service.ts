import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoanScheduleEntity } from "./loanSchedule.entity";
import { Repository, DataSource } from "typeorm";
import config from "src/ormconfig";

@Injectable()
export class LoanScheduleService {
    constructor(@InjectRepository(LoanScheduleEntity)private readonly loanScheduleRepository: Repository<LoanScheduleEntity>){}

    async getScheduleByAcc(loanRef:string): Promise<LoanScheduleEntity[]>{
        return await this.loanScheduleRepository.findBy({loanAccountNumber: loanRef});
    }

    async getDueLoansCount(thisDate:string): Promise<LoanScheduleEntity[]> {

        const sql = 'select count(*) from loanSchedule where collectionStatus = "pending" and Date(dueDate) <=  "'+ thisDate + '"';
        console.log(sql);
        return await this.loanScheduleRepository.query(sql);
    }

    async getDueLoanSum(thisDate:string): Promise<any> {
        const sql = 'select sum(dueAmount) as total from loanSchedule where collectionStatus = "pending" and Date(dueDate) <= "'+ thisDate + '"';
        console.log(sql);
        return await this.loanScheduleRepository.query(sql);
    }

    async getDueLoansList(thisDate:string): Promise<LoanScheduleEntity[]> {

        const sql = 'select * from loanSchedule where collectionStatus = "pending" and Date(dueDate) <= "'+ thisDate + '"';
        console.log(sql);
        return await this.loanScheduleRepository.query(sql);
    }

    async createLoanSchedule(loanScheduleData:LoanScheduleEntity): Promise<any>{
        return await this.loanScheduleRepository.save(loanScheduleData);
    }


    async updateLoanSchedule (updateScheduleRequest:LoanScheduleEntity,collectionStatus:string,collectedAmount:string) : Promise<any> {
    
        this.loanScheduleRepository.createQueryBuilder()
        .update(updateScheduleRequest)
        .set({
            collectionStatus: collectionStatus,
            collectedAmount: collectedAmount
        })
        .where("scheduleRef = :scheduleRef", {scheduleRef: updateScheduleRequest.scheduleRef})
        .execute()
    }

}