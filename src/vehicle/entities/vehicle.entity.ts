import { Office } from 'src/office/entities/office.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vehicle {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public name!: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  public delFlag!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @ManyToOne(() => Office, (office) => office.vehicle, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  office: Office;

}
