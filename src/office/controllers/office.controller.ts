import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/authGuard/auth.guard';
import { CreateOfficeDto } from '../dto/create-office.dto';
import { UpdateOfficeDto } from '../dto/update-office.dto';
import { OfficeService } from '../services/office.service';

@ApiTags('Office')
@Controller('office')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Post('add')
  create(@Body() createOfficeDto: CreateOfficeDto) {
    console.log("🚀 ~ file: office.controller.ts ~ line 22 ~ OfficeController ~ create ~ createOfficeDto", createOfficeDto)
    return this.officeService.create(createOfficeDto);
  }

  @Get('findAll')
  findAll() {
    return this.officeService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.officeService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateOfficeDto: UpdateOfficeDto) {
    return this.officeService.update(+id, updateOfficeDto);
  }
  @Patch('changeStatus/:id')
  changeStatus(@Param('id') id: string, @Body() updateOfficeDto: UpdateOfficeDto) {
    return this.officeService.changeStatus(+id , updateOfficeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.officeService.remove(+id);
  }
}
