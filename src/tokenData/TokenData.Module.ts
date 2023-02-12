import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenDataController } from "./tokenData.controller";
import { TokenDataEntity } from "./tokenData.entity";
import { TokenDataService } from "./tokenData.service";
import { Module } from "@nestjs/common";
import { LoanEntity } from "src/loan/loan.entity";
import { LoanService } from "src/loan/loan.service";

@Module({
    imports: [TypeOrmModule.forFeature([TokenDataEntity,LoanEntity])],
    controllers: [TokenDataController],
    providers: [TokenDataService,LoanService]
})
export class TokenDataModule{}