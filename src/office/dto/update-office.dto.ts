import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { CreateOfficeDto } from './create-office.dto';

export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {
    @ApiProperty()
    @IsBoolean()
    delFlag: boolean;
}

// export class UpdateOfficeStatus extends PartialType(CreateOfficeDto) {

//   @ApiProperty()
//   @IsBoolean()
//   delFlag: boolean;
// }
