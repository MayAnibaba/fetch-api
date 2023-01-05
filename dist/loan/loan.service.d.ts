import { LoanEntity } from "./loan.entity";
import { Repository } from "typeorm";
export declare class LoanService {
    private readonly loanRepository;
    constructor(loanRepository: Repository<LoanEntity>);
    getAllLoans(): Promise<any>;
}
