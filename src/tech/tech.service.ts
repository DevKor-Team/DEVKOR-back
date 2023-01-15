import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tech } from './tech.entity';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(Tech)
    private readonly techRepository: Repository<Tech>,
  ) {}
}
