import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModule } from 'src/vehicle/modules/vehicle.module';
import { OfficeController } from '../controllers/office.controller';
import { Office } from '../entities/office.entity';
import { OfficeService } from '../services/office.service';

@Module({
  controllers: [OfficeController],
  providers: [OfficeService],
  imports: [TypeOrmModule.forFeature([Office]), VehicleModule],
  exports: [OfficeService],
})
export class OfficeModule {}
