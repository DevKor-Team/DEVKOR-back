import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvVars } from 'common/interface';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UploadsModule } from './uploads/uploads.module';
import { TechModule } from './tech/tech.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService<EnvVars>) => ({
        type: 'postgres',
        url: config.get('DB_URL'),
        synchronize: config.get('DB_SYNC') || false,
        autoLoadEntities: true,
        timezone: 'Asia/Seoul',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    UploadsModule,
    TechModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
