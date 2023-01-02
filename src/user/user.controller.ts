import { Controller, Get } from "@nestjs/common";
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

}