import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<any>;
    createUser(registerRequest: any): Promise<any>;
    blockUser(blockRequest: any): Promise<any>;
    userLogin(loginRequest: any): Promise<any>;
}
