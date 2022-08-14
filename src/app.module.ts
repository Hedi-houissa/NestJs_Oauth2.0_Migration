import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OfficeModule } from './office/modules/office.module';
import { VehicleModule } from './vehicle/modules/vehicle.module';
import { UsersModule } from './users/users.module';
import { typeOrmModuleOptions } from './config/ormconfig';
import { Office } from './office/entities/office.entity';
import { Vehicle } from './vehicle/entities/vehicle.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OfficeModule,
    VehicleModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Office,Vehicle]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...typeOrmModuleOptions,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
