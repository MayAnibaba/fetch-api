import { Injectable } from "@nestjs/common";
import { LogEntitiy } from "./log.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable() 
export class LogService{
    constructor(@InjectRepository(LogEntitiy)private readonly logRepository: Repository<LogEntitiy>){}

    async getAllActiveLoanCount(): Promise<LogEntitiy>{
        return await this.logRepository.query('select * from logs order by id Desc limit 1');
    }


    async createLog(logData:LogEntitiy): Promise<any>{
        return await this.logRepository.save(logData);
    }
}