import { LoanService } from "./loan.service";
import { LoanEntity } from "./loan.entity";
export declare class LoanController {
    private readonly loanService;
    constructor(loanService: LoanService);
    getAllLoans(): Promise<{
        code: string;
        status: string;
        message: string;
        data: LoanEntity[];
    }>;
    createLoan(addRequest: any, res: any): Promise<{
        code: string;
        status: string;
        message: string;
    }>;
}
