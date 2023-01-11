import { Body, Controller, Get, Res } from "@nestjs/common";
import { TransactionService } from "./transaction.service";

@Controller('transactions')

export class TransactionController {

    constructor(private readonly transactionService: TransactionService){}
    
    @Get()
        async getTransactions(@Res({passthrough: true}) res ){
        const transactionsData = await this.transactionService.getAllTransactions();
        
        return ({
            code: '00',
            status: 'successful',
            message: 'retreiving all transactions',
            data: transactionsData
        })

    }
}