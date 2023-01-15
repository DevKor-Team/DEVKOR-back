import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTechParam } from './dto/create-tech.dto';
import { UpdateTechParam } from './dto/update-tech.dto';
import { Tech } from './tech.entity';

@Injectable()
export class TechService {
  constructor(
    @InjectRepository(Tech)
    private readonly techRepository: Repository<Tech>,
    private readonly userService: UsersService,
  ) {}

  async findAll() {
    return this.techRepository.find({
      relations: {
        creator: true,
      },
      take: 10,
    });
  }

  async findOne(techId: number) {
    return this.techRepository.findOne({
      where: { id: techId },
      relations: { creator: true },
    });
  }

  async createTech(userId: number, createTechDto: CreateTechParam) {
    const newTech = new Tech();
    const creator = await this.userService.fetchUserById(userId);
    if (!creator) {
      throw new NotFoundException();
    }
    newTech.title = createTechDto.title;
    newTech.contents = createTechDto.contents;
    newTech.postGroup = createTechDto.postGroup;
    newTech.creator = creator;

    return await this.techRepository.save(newTech);
  }

  async updateTech(techId: number, updateTechDto: UpdateTechParam) {
    return this.techRepository.update(techId, updateTechDto);
  }

  async deleteTech(techId: number) {
    return this.techRepository.delete(techId);
  }
}
