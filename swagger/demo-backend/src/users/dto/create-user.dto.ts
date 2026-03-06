import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, isString, IsString } from "class-validator";
import { number } from "joi";

export class createUserDto{
    @ApiProperty()
    @IsString()
    name:string

    @ApiProperty()
    @IsEmail()
    email:string

    @Type(()=> number)
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    age?: number
}