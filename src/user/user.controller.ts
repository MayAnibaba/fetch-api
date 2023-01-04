import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { Request, Response } from "express";

@Controller('user')
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
    async createUser(@Body() registerRequest: any, res: Response): Promise<any> {
        console.log('Register request: ' + registerRequest.email);
        const userCreated =  await this.userService.createUser(registerRequest);

        if(userCreated == null){
            res.status(400);
            //null indicates users wasn't created 
            return ({
                code: '82',
                status: 'failure',
                message: 'customer already exists',
            })
        } else {
            return ({
                code: '00',
                status: 'success',
                message: 'user created succesfully',
                data: userCreated
            })
        }
    }

    @Post('active')
    async blockUser(@Body() blockRequest: any) : Promise<any> {
        console.log('block user request:' + blockRequest.email);

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
    async userLogin(@Body() loginRequest: any, @Res({passthrough: true}) res: Response) {
        console.log('login request:' + loginRequest.email);
        const loginResponse = await this.userService.login(loginRequest);
        console.log('loginService Resposne: ' + loginResponse);
        if(loginResponse == 'invalidLogin'){
            res.status(400);
            return({
                code: '90',
                status: 'failure',
                message: 'invalid login details',
            })
        } else if(loginResponse == 'inactiveUser') {
            res.status(400);
            return ({
                code: '83',
                status: 'failure',
                message: 'user account is blocked',
            })
        } else if(loginResponse == 'nouser') {
            res.status(400);
            return ({
                code: '81',
                status: 'failure',
                message: 'user not found',
            })
        } else {
            res.status(200);
            return ({
                code: '00',
                status: 'success',
                message: 'user login succesfully',
                data: loginResponse
            })
        }
    }

    @Post('resetpassword')
    async resetPassowrd(@Body() requestbody: any , res: Response) {
        const passwordResponse = await this.userService.newPassword(requestbody);
        if(passwordResponse == 'nouser'){
            res.status(400);
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