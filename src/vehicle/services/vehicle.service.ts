import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeService } from 'src/office/services/office.service';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { Vehicle } from '../entities/vehicle.entity';

@Injectable()
export class VehicleService {

  @InjectRepository(Vehicle)
  private readonly vehicleRepository: Repository<Vehicle>;

  constructor(
    @Inject(forwardRef(() => OfficeService))
    private officeService: OfficeService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    console.log(
      '🚀 ~ file: vehicle.service.ts ~ line 9 ~ VehicleService ~ create ~ createVehicleDto',
      createVehicleDto,
    );
    const officeId = createVehicleDto.officeId;
    try {
      const vehicle: Vehicle = new Vehicle();
      vehicle.name = createVehicleDto.name;
      if (!isNaN(officeId) || officeId > 0) {
        const office = await this.officeService.findOne(officeId);
        if (office) {
          vehicle.office = office;
        } else {
          throw new HttpException('Office not found', HttpStatus.NOT_FOUND);
        }
      }
      return await this.vehicleRepository.save(vehicle);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.vehicleRepository.find({ relations: ['office'] });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.vehicleRepository.findOne(id, {
        relations: ['office'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async findLocation(id: number) {
    try {
      const vehicle = await this.findOne(id)
      if(vehicle.office){
        const office = await this.officeService.findOne(vehicle.office.id);
        console.log("🚀 ~ file: vehicle.service.ts ~ line 75 ~ VehicleService ~ findLocation ~ office", office)
        if (office) {
          return office.location
        } else {
          throw new HttpException('Office not found', HttpStatus.NOT_FOUND);
        }
      }
      return 'vehicle not affected to any office'
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    try {
      await this.vehicleRepository.update(id, updateVehicleDto);
      return this.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async affected(id: number, idOffice: number) {
    try {
      const office = await this.officeService.findOne(idOffice);
      const vehicle = await this.findOne(id)
      if (office&&vehicle) {
        vehicle.office=office
        await this.vehicleRepository.update(id, vehicle);
        return await this.findOne(id)
      } else {
        throw new HttpException('office or vehicle Not found', HttpStatus.NOT_FOUND);
      }

    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async Desaffected(id: number) {
    try {
      const vehicle = await this.findOne(id)
      if (vehicle) {
        vehicle.office=null
        await this.vehicleRepository.update(id, vehicle);
        return await this.findOne(id)
      } else {
        throw new HttpException('vehicle Not found', HttpStatus.NOT_FOUND);
      }

    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: number) {
    try {
      return this.vehicleRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
