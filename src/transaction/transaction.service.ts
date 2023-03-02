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

    async getAllByTranRef(transRef:string): Promise<TransactionEntity>{
        return await this.transactionRepository.findOneBy({transRef: transRef});
    }

    async getAllTodayList(): Promise<TransactionEntity[]>{
        return await this.transactionRepository.find();
    }

    async addTransaction(transactionData: TransactionEntity) : Promise<any> {
        return await this.transactionRepository.save(transactionData);
    }

    async getAllTodaySum(thisDate:string): Promise<any> {
        const sql = 'select sum(amount) as total from transactions where status="success" and Date(createdAt) = "'+ thisDate + '"';
        console.log(sql);
        return await this.transactionRepository.query(sql);
    }

    async getAllSum(): Promise<any> {
        const sql = 'select sum(amount) as total from transactions where status="success"';
        console.log(sql);
        return await this.transactionRepository.query(sql);
    }

}
