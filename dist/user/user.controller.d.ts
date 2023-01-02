import { UserService } from "./user.service";
import { createUserDTO } from "src/dto/createUser.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<any>;
    createUser(createUserDto: createUserDTO): Promise<any>;
}
