import {IsEmail, IsIn, IsString, MinLength} from "class-validator"
export class Register{
    @IsEmail()
    email:string

    @IsString()
    @MinLength(4)
    password:string
    
  @IsIn(["admin","user"])
  role:string
}