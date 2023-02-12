import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDataEntity } from "./tokenData.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenDataService{
    constructor(@InjectRepository(TokenDataEntity) private readonly tokenDataRepository: Repository<TokenDataEntity>){}

    async addTokenData(tokenData: TokenDataEntity) : Promise<any> {
        return await this.tokenDataRepository.save(tokenData);
    }

    async getTokenByRef(loanRef:string): Promise<TokenDataEntity[]>{
        return await this.tokenDataRepository.findBy({loanRef: loanRef});
    }

}