import { LoanEntity } from "./loan.entity";
import { Repository } from "typeorm";
export declare class LoanService {
    private readonly loanRepository;
    constructor(loanRepository: Repository<LoanEntity>);
    getAllLoans(): Promise<LoanEntity[]>;
    getLoanByAcc(loanAcc: string): Promise<LoanEntity>;
    getLoanByRef(_loanRef: string): Promise<LoanEntity>;
    createLoan(loanData: LoanEntity): Promise<any>;
}
