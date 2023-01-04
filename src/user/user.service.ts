import { Body, Injectable, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { compareSync, hashSync, genSaltSync } from "bcrypt";


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
        console.log('login check: '+ await compareSync(loginRequest.password,thisUser.password));


        if(thisUser == null){
            return 'nouser';
        } else {
          //check if user is active
          if(thisUser.isActive){
            if(await compareSync(loginRequest.password,thisUser.password)){
                //if user if email and password match reset failed login counter and update last login
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

    async newPassword (passwordRequest ) : Promise<any> {
        const thisUser = await this.findByEmail(passwordRequest.email); 

        if(thisUser == null){
            return 'nouser';
        } else { 
            const salt = genSaltSync(10);
            const hash = hashSync(passwordRequest.password, salt);

            const updateResponse =  await this.userRepository.createQueryBuilder()
            .update(thisUser)
            .set({
                isActive: thisUser.isActive,
                password: hash,
                salt: salt,
                failedLoginAttempt: 0,
                updatedAt: new Date().toJSON()
            })
            .where("email = :email", {email: passwordRequest.email})
            .execute()
            return updateResponse;

        }

    }
}