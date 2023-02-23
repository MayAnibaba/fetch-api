import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "./transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionService{
    constructor(@InjectRepository(TransactionEntity) private readonly transactionRepository: Repository<TransactionEntity>) {}

    async getAllTransactions(): Promise<TransactionEntity[]>{
        return await this.transactionRepository.find();
    }

    async getAllTodayList(): Promise<TransactionEntity[]>{
        return await this.transactionRepository.find();
    }


    async getAllTodaySum(thisDate:string): Promise<any> {
        const sql = 'select sum(dueAmount) as total from loanSchedule where status="success" and Date(createdAt) = "'+ thisDate + '"';
        console.log(sql);
        return await this.transactionRepository.query(sql);
    }


    
}
