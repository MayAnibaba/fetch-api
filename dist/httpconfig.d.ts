import { HttpModuleOptions, HttpModuleOptionsFactory } from "@nestjs/axios";
export declare class Httpconfig implements HttpModuleOptionsFactory {
    createHttpOptions(): HttpModuleOptions;
}
