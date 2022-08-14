import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { VehicleService } from '../services/vehicle.service';

@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('add')
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }
 
  @Get('findAll')
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id);
  }
  @Get('getLocation/:id')
  findLocation(@Param('id') id: string) {
    return this.vehicleService.findLocation(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Patch('changeStatus/:id')
  changeStatus(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(+id , updateVehicleDto);
  }
  @Patch('affected/:id/:idOffice')
  affected(@Param('id') id: string, @Param('idOffice') idOffice: string) {
    return this.vehicleService.affected(+id ,+idOffice );
  }
  
  @Patch('Desaffected/:id')
  Desaffected(@Param('id') id: string) {
    return this.vehicleService.Desaffected(+id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
