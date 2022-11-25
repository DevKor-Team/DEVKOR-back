import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserParam } from './dto/create-user.dto';
import { DuplicateCheckParam, FetchUserParam } from './dto/fetch-user.dto';
import { UpdateRoleParam, UpdateUserParam } from './dto/update-user.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async fetchUsers(fetchUserParam: FetchUserParam): Promise<Users[]> {
    return this.usersRepository.find({ where: fetchUserParam });
  }

  async fetchUser(userId: number): Promise<Users> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  async createUser(createUserDto: CreateUserParam) {
    return this.usersRepository.save(createUserDto);
  }

  async updateUser(userId: number, updateUserDto: UpdateUserParam) {
    return this.usersRepository.update(userId, updateUserDto);
  }

  async updateRole(userId: number, updateRoleDto: UpdateRoleParam) {
    return this.usersRepository.update(userId, updateRoleDto);
  }

  async deleteUser(userId: number) {
    return this.usersRepository.delete(userId);
  }

  async duplicateCheck(duplicateCheckParam: DuplicateCheckParam) {
    return this.usersRepository.find({ where: duplicateCheckParam });
  }
}
