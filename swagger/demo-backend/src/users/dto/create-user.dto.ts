import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class createUserDto{
    @ApiProperty()
    name:string

    @ApiProperty()
    email:string

    @ApiPropertyOptional()
    age?: number
}