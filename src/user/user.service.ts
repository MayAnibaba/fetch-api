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

    async findByEmail(email): Promise<UserEntity>{
        return await this.userRepository.findOneBy({email: email})
    }

    async createUser(registerRequest): Promise<any>{
        //check if user exists
        const thisUser = await this.findByEmail(registerRequest.email); 
        console.log(thisUser);

        if(thisUser == null){
          const newUser = new UserEntity();
          Object.assign(newUser,registerRequest);
          //return newly created user details
          return await this.userRepository.save(newUser);
        } else {
          //return null to indicate user wasn't created 
          return null;
        }
    }

    async updateUser(user: UserEntity): Promise<any> {
        const updateResponse =  await this.userRepository.createQueryBuilder()
        .update(user)
        .set({
            isActive: user.isActive
        })
        .where("email = :email", {email: user.email})
        .execute()
        return updateResponse;
    }
}