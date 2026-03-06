import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class BaseQueryDto{
    @ApiPropertyOptional({example:1})
    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    @Min(1)
    page?: number=1

    @ApiPropertyOptional({example:10})
    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    @Min(1)
    perPage?:number=10

    @ApiPropertyOptional({example: "John"})
    @IsOptional()
    @IsString()
    search?:string

}