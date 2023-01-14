import { Body, Controller, Get, Post, Res, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
//import { Request, Response } from "express";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<any> {
        const userData =  await this.userService.findAll();

        const response = ({
            code: '00',
            status: 'success',
            message: 'success',
            data: userData
          })

        return response;
    }

    @Post('register')
    async createUser(@Body() registerRequest: any, @Res({passthrough: true}) res) {
        console.log('Register request: ' + JSON.stringify(registerRequest));

        //check if user exists
        const thisUser = await this.userService.findByEmail(registerRequest.email); 
        
        const newUser = new UserEntity();
        Object.assign(newUser,registerRequest);

        if(thisUser == null){
            const userCreated =  await this.userService.createUser(newUser);
            return ({
                code: '00',
                status: 'success',
                message: 'user created succesfully',
                data: userCreated
            })        
        } else {
            res.status(HttpStatus.BAD_REQUEST);
            //null indicates users wasn't created 
            return ({
                code: '82',
                status: 'failure',
                message: 'customer already exists',
            })
        }
    }

    @Post('active')
    async blockUser(@Body() blockRequest: any) {
        console.log('block user request: ' + JSON.stringify(blockRequest.email));

        const blockRequestMapped = new UserEntity();

        if(blockRequest.status == 'active'){
            blockRequestMapped.isActive = true
        } else {
            blockRequestMapped.isActive = false
        }
        blockRequestMapped.email = blockRequest.email;
        const blockResponse = await this.userService.updateUser(blockRequestMapped);
        console.log('Block user respose:' + blockResponse);

        return ({
            code: '00',
            status: 'success',
            message: 'user updated succesfully',
            data: blockResponse
        })
    }

    @Post('login')
    async userLogin(@Body() loginRequest: any, @Res({passthrough: true}) res) {
        console.log('login request: ' + JSON.stringify(loginRequest));
        const loginResponse = await this.userService.login(loginRequest);
        console.log('loginService Resposne: ' + loginResponse);
        if(loginResponse == 'invalidLogin'){
            res.status(HttpStatus.BAD_REQUEST);
            return({
                code: '90',
                status: 'failure',
                message: 'invalid login details',
            })
        } else if(loginResponse == 'inactiveUser') {
            res.status(HttpStatus.BAD_REQUEST);
            return ({
                code: '83',
                status: 'failure',
                message: 'user account is blocked',
            })
        } else if(loginResponse == 'nouser') {
            res.status(HttpStatus.BAD_REQUEST);
            return ({
                code: '81',
                status: 'failure',
                message: 'user not found',
            })
        } else {
            res.status(HttpStatus.OK);
            return ({
                code: '00',
                status: 'success',
                message: 'user login succesfully',
                data: loginResponse
            })
        }
    }

    @Post('resetpassword')
    async resetPassowrd(@Body() requestbody: any , @Res({passthrough: true}) res) {
        console.log('Reset password: ' + JSON.stringify(requestbody))
        const passwordResponse = await this.userService.newPassword(requestbody);
        if(passwordResponse == 'nouser'){
            res.status(HttpStatus.BAD_REQUEST);
            return({
                code: '81',
                status: 'failure',
                message: 'user not found',
            })
        } else {
            return({
                code: '00',
                status: 'success',
                message: 'password changed succesfully',
                data: passwordResponse
            })
        }
    }

}