import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { map } from "rxjs";
import { createUserDTO } from "src/dto/createUser.dto";

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
    async createUser(@Body() createUserDto: createUserDTO): Promise<any> {
        console.log(createUserDto);

        //return this.userService.createUser(createUserDto);
    }

}