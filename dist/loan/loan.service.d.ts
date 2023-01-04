import { LoanEntity } from "./loan.entity";
import { Repository } from "typeorm";
export declare class LoanService {
    private readonly userRepository;
    constructor(userRepository: Repository<LoanEntity>);
}
