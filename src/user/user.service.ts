import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { hashSync } from "bcrypt";


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
            isActive: user.isActive,
            updatedAt: new Date().toJSON()
        })
        .where("email = :email", {email: user.email})
        .execute()
        return updateResponse;
    }

    async login (loginRequest) : Promise<any> {
        //check if user exists
        const thisUser = await this.findByEmail(loginRequest.email); 
        console.log(thisUser);

        if(thisUser == null){
            return 'user not found';
        } else {
          //check if user is active
          if(thisUser.isActive){
            //check if user if email and password match 
            if(thisUser.password == hashSync(thisUser.password, thisUser.salt)){
                this.userRepository.createQueryBuilder()
                .update(thisUser)
                .set({
                    failedLoginAttempt: 0,
                    lastLogin: new Date().toJSON()
                })
                .where("email = :email", {email: thisUser.email})
                .execute()
                return thisUser
              } else {
                //if email and password doesn't match update failed attempt count and block on 3rd failure
                var isActive = true;
                if(thisUser.failedLoginAttempt >= 2) {
                    isActive = false;
                }

                this.userRepository.createQueryBuilder()
                .update(thisUser)
                .set({
                    failedLoginAttempt: thisUser.failedLoginAttempt + 1,
                    isActive: isActive,
                    updatedAt: new Date().toJSON()
                })
                .where("email = :email", {email: thisUser.email})
                .execute()

                return 'invalidLogin'
              }
          } else {
            return 'inactiveUser'
          }
        }
    }
}