import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleService } from 'src/vehicle/services/vehicle.service';
import { Repository } from 'typeorm';
import { CreateOfficeDto } from '../dto/create-office.dto';
import { UpdateOfficeDto } from '../dto/update-office.dto';
import { Office } from '../entities/office.entity';

@Injectable()
export class OfficeService {
  @InjectRepository(Office)
  private readonly officeRepository: Repository<Office>;
  constructor(
    @Inject(forwardRef(() => VehicleService))
    private vehicleService: VehicleService,
  ) {}

  async create(createOfficeDto: CreateOfficeDto) {
    try {
      const office: Office = new Office();
      office.name = createOfficeDto.name;
      office.location = createOfficeDto.location;
      return await this.officeRepository.save(office);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.officeRepository.find({ relations: ['vehicle'] });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.officeRepository.findOne(id, {
        relations: ['vehicle'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateOfficeDto: UpdateOfficeDto) {
    try {
      await this.officeRepository.update(id, updateOfficeDto);
      return this.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: number) {
    try {
      return this.officeRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async changeStatus(id: number ,updateOfficeDto: UpdateOfficeDto) {
    try {
      
      const office= await this.findOne(id);
      console.log(
        '🚀 ~ file: office.service.ts ~ line 69 ~ OfficeService ~ activate ~ office',
        office,
      );
      if (!updateOfficeDto.delFlag) {
        office.vehicle.map(async (veh) => {
          await this.vehicleService.Desaffected(veh.id);
        });
      }
    
      console.log("🚀 ~ file: office.service.ts ~ line 87 ~ OfficeService ~ changeStatus ~ office", office)
      await this.officeRepository.update(id, updateOfficeDto);
      return await this.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
