import { LoanService } from "./loan.service";
export declare class LoanController {
    private readonly loanService;
    constructor(loanService: LoanService);
    getAllLoans(): Promise<{
        code: string;
        status: string;
        message: string;
        data: import("./loan.entity").LoanEntity[];
    }>;
    createLoan(addRequest: any, addResponse: any): Promise<void>;
}
