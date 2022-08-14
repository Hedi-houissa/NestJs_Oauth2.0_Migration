import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeModule } from 'src/office/modules/office.module';

import { VehicleController } from '../controllers/vehicle.controller';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleService } from '../services/vehicle.service';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService],
  imports: [
    TypeOrmModule.forFeature([Vehicle])
    , forwardRef(() => OfficeModule)
  ],
  exports:[VehicleService]
})
export class VehicleModule {}
