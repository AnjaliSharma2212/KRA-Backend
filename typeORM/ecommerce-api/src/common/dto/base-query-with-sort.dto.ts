import { ApiPropertyOptional } from "@nestjs/swagger";
import { BaseQueryDto } from "./base-query.dto";
import { IsIn, IsOptional, IsString } from "class-validator";


export class BaseQueryDtoWithSort extends BaseQueryDto{

    @ApiPropertyOptional({example:"createdAt"})
    @IsOptional()
    @IsString()
    sortBy?: string="createdAt"

    @ApiPropertyOptional({example:"DESC"})
    @IsOptional()
    @IsIn(["ASC" ,"DESC"])
    sortOrder?:"ASC" | "DESC" ="DESC"
}