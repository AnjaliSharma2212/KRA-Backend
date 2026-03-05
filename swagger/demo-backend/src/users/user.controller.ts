import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { createUserDto } from "./dto/create-user.dto";

@ApiTags('Users')
@Controller('users')

export class UsersController{
    @Post()
    @ApiBearerAuth()
    createUser(@Body() dto: createUserDto){
        return{
         message:'user Created',
         data: dto
        }
    }
}