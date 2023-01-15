import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOAuthParam, CreateUserParam } from './dto/create-user.dto';
import { DuplicateCheckParam, FetchUserParam } from './dto/fetch-user.dto';
import { UpdateRoleParam, UpdateUserParam } from './dto/update-user.dto';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async fetchUsers(fetchUserParam: FetchUserParam): Promise<Users[]> {
    return this.usersRepository.find({ where: fetchUserParam });
  }

  async fetchUserById(userId: number): Promise<Users> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  async fetchUserByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser(createUserDto: CreateUserParam) {
    const saltOrRounds = 10;
    const encryptedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    createUserDto.password = encryptedPassword;
    return this.usersRepository.save(createUserDto);
  }

  async createOAuthUser(createOAuthDto: CreateOAuthParam) {
    return this.usersRepository.save(createOAuthDto);
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
