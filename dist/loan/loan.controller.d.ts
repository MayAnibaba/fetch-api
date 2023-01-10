import { LoanService } from "./loan.service";
import { Response as Res } from "express";
export declare class LoanController {
    private readonly loanService;
    constructor(loanService: LoanService);
    getAllLoans(): Promise<{
        code: string;
        status: string;
        message: string;
        data: import("./loan.entity").LoanEntity[];
    }>;
    createLoan(addRequest: any, res: Res): Promise<{
        code: string;
        status: string;
        message: string;
    }>;
}
