import { Body, Controller, Get, Post, Res } from "@nestjs/common";
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

    @Post('byTransRef')
    async getByLoanRef(@Body() transRefRequest: any, @Res({passthrough: true}) res){
        const findTransaction = await this.transactionService.getAllByTranRef(transRefRequest.transRef);
        if(findTransaction != null){

            return ({
                code: '00',
                status: 'successful',
                message: 'listing transaction',
                data: findTransaction
            })
        } else {
            return({
                code: '81',
                status: 'failure',
                message: 'transaction account not found',
            })
        }
    }
}