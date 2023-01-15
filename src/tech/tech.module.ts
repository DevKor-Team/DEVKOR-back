import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TechController } from './tech.controller';
import { Tech } from './tech.entity';
import { TechService } from './tech.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tech]), AuthModule],
  controllers: [TechController],
  providers: [TechService],
  exports: [TechService],
})
export class TechModule {}
