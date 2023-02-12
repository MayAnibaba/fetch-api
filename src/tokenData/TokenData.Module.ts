import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenDataController } from "./tokenData.controller";
import { TokenDataEntity } from "./tokenData.entity";
import { TokenDataService } from "./tokenData.service";
import { Module } from "@nestjs/common";
import { LoanEntity } from "src/loan/loan.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TokenDataEntity,LoanEntity])],
    controllers: [TokenDataController],
    providers: [TokenDataService]
})
export class TokenDataModule{}