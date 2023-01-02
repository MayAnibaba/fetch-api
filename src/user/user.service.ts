import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";


@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)private readonly userRepository: Repository<UserEntity>){}

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async createUser(registerRequest) {

        const newUser = new UserEntity();
        Object.assign(newUser,registerRequest);

        return await this.userRepository.save(newUser);
    }
}