import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Office {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  public name!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  public location!: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  public delFlag!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.office, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  vehicle: Vehicle[];
}
