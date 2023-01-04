import { UserService } from "./user.service";
import { Response } from "express";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<any>;
    createUser(registerRequest: any): Promise<any>;
    blockUser(blockRequest: any): Promise<any>;
    userLogin(loginRequest: any, res: Response): Promise<{
        code: string;
        status: string;
        message: string;
        data?: undefined;
    } | {
        code: string;
        status: string;
        message: string;
        data: any;
    }>;
}
