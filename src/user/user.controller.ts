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
    }

}