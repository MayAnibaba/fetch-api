import { TransactionEntity } from "./transaction.entity";
import { Repository } from "typeorm";
export declare class TransactionService {
    private readonly transactionRepository;
    constructor(transactionRepository: Repository<TransactionEntity>);
    getAllTransactions(): Promise<TransactionEntity[]>;
}
