import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Users } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import { TechController } from './tech.controller';
import { Tech } from './tech.entity';
import { TechService } from './tech.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tech]), AuthModule, UsersModule],
  controllers: [TechController],
  providers: [TechService],
  exports: [TechService],
})
export class TechModule {}
