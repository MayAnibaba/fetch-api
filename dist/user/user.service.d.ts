import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findByEmail(email: any): Promise<UserEntity>;
    createUser(registerRequest: UserEntity): Promise<any>;
    updateUser(user: UserEntity): Promise<any>;
    login(loginRequest: any): Promise<any>;
    newPassword(passwordRequest: any): Promise<any>;
}
