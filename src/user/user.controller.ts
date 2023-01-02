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
        console.log(registerRequest);
        return this.userService.createUser(registerRequest);
    }

}