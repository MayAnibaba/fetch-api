import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenDataController } from "./tokenData.controller";
import { TokenDataEntity } from "./tokenData.entity";
import { TokenDataService } from "./tokenData.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([TokenDataEntity])],
    controllers: [TokenDataController],
    providers: [TokenDataService]
})
export class TokenDataModule{}