import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { FetchUserDto } from './dto/fetch-user.dto';
import { UpdateRoleDto, UpdateUserDto } from './dto/update-user.dto';
import { Role } from './users.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async fetchUserById(@Param('userId') userId: number) {
    const user = await this.usersService.fetchUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Get()
  async fetchUsers(@Query() fetchUserDto: FetchUserDto) {
    if (
      Object.keys(fetchUserDto).length !== 0 &&
      fetchUserDto.position == null
    ) {
      throw new BadRequestException();
    }
    return this.usersService.fetchUsers(fetchUserDto);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.duplicateCheck({
      name: createUserDto.name,
      email: createUserDto.email,
    });

    if (user.length !== 0) {
      throw new ConflictException();
    }

    return this.usersService.createUser(createUserDto);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.fetchUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }

    const result = await this.usersService.updateUser(userId, updateUserDto);

    if (result.affected === 0) throw new BadRequestException();

    return { success: true, message: '유저 정보업데이트 성공' };
  }
}
