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
    
}
