import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateAuthDto implements Readonly<CreateAuthDto> {
    @ApiProperty()
    @IsString()
    username: string
    
    @ApiProperty()
    password: string
}