import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDataEntity } from "./tokenData.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenDataService{
    constructor(@InjectRepository(TokenDataEntity) private readonly tokenDataRepository: Repository<TokenDataEntity>){}

    async addTokenData(tokenData: TokenDataEntity) : Promise<any> {

    }
}