import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<any>;
    createUser(registerRequest: any, res: any): Promise<{
        code: string;
        status: string;
        message: string;
        data: any;
    } | {
        code: string;
        status: string;
        message: string;
        data?: undefined;
    }>;
    blockUser(blockRequest: any): Promise<{
        code: string;
        status: string;
        message: string;
        data: any;
    }>;
    userLogin(loginRequest: any, res: any): Promise<{
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
    resetPassowrd(requestbody: any, res: any): Promise<{
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
