import { TransactionService } from "./transaction.service";
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    getTransactions(res: any): Promise<{
        code: string;
        status: string;
        message: string;
        data: import("./transaction.entity").TransactionEntity[];
    }>;
}
