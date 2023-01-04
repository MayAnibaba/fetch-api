import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { map } from "rxjs";

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
    async createUser(@Body() registerRequest: any): Promise<any> {
        console.log('Register request: ' + registerRequest.email);
        const userCreated =  await this.userService.createUser(registerRequest);

        if(userCreated == null){
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
    async userLogin(@Body() loginRequest: any) : Promise<any> {
        console.log('block user request:' + loginRequest.email);
        const loginResponse = await this.userService.login(loginRequest);
        if(loginResponse == 'invalidLogin'){
            return ({
                code: '81',
                status: 'failure',
                message: 'invalid login details',
            })
        } else if(loginResponse == 'inactiveUser') {
            return ({
                code: '83',
                status: 'success',
                message: 'user account is blocked',
                data: loginResponse
            })
        } else {
            return ({
                code: '00',
                status: 'success',
                message: 'user login succesfully',
                data: loginResponse
            })
        }
    }

}