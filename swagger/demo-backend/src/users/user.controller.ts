import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { createUserDto } from "./dto/create-user.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController{
    @Get(':id')
    getUser(@Param('id')id:string){
        return `User Id is ${id}`
        }

     @Get()   
     getUsers(
        @Query('role') role:string,
        @Query('age') age:number
    ){
        return {role, age}
    }
    @Get(':userId/posts/:postId')
    getPost(
        @Param('userId') userId:string,
        @Param('postId') postId:string
    ){
        return {userId , postId}
    }

    
    @Post()
    createUsers(@Body() createUserDto: createUserDto){
        return createUserDto
    }

    @Post()
    @ApiBearerAuth()
    createUser(@Body() dto: createUserDto){
        return{
         message:'user Created',
         data: dto
        }
    }
}