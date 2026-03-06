import {IsEmail, IsString} from "class-validator"

export class LoginDto{
    @IsEmail()
    name:string

    @IsString()
    password:string
}