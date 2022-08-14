import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Office } from 'src/office/entities/office.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

require('dotenv').config()

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(<string>process.env.MYSQL_PORT),
  username:process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE, 
  entities: [Office,Vehicle],
  synchronize: true,
};


const config = {
...typeOrmModuleOptions,
migrationsTableName: 'migrations',
migrations: ['dist/migrations/*{.ts,.js}'],
logging: true,
logger: 'file',
cli: {
  migrationsDir: 'src/migrations',
},
};

export default config;