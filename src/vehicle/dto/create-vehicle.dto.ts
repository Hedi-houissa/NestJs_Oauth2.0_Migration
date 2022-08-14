import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateVehicleDto implements Readonly<CreateVehicleDto>{

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    officeId: number




}
