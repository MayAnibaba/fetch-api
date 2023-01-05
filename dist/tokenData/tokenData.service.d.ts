import { TokenDataEntity } from "./tokenData.entity";
import { Repository } from "typeorm";
export declare class TokenDataService {
    private readonly tokenDataRepository;
    constructor(tokenDataRepository: Repository<TokenDataEntity>);
    addTokenData(tokenData: TokenDataEntity): Promise<any>;
}
