import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserParams } from './dto/create-users.dto';
import { Mbti, Position } from './users.enum';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  const mockUsersRepository = {
    save: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create user', () => {
    it('should create user with params', () => {
      // Given
      const createUserParams: CreateUserParams = {
        name: 'user1',
        major: 'computer science',
        birthDay: new Date(),
        github: 'https://github.com/DevKor-Team',
        blog: 'https://5hongmin.tistory.com/',
        introduction: "hihi I'm user1",
        hobby: 'playing game',
        imageUrl: 's3.url',
        position: Position.Backend,
        mbti: Mbti.ENFJ,
      };

      // When
      usersService.createUser(createUserParams);

      // Then
      expect(mockUsersRepository.create).toBeCalledWith(createUserParams);
    });

    it('should throw 400 exception if params are invalid', () => {
      // Given
      const createUserParams = {
        birthDay: new Date(),
        github: 'https://github.com/DevKor-Team',
        blog: 'https://5hongmin.tistory.com/',
        introduction: "hihi I'm user1",
        hobby: 'playing game',
        imageUrl: 's3.url',
        position: Position.Backend,
        mbti: Mbti.ENFJ,
      };

      // When
      usersService.createUser(createUserParams);

      // Then
      expect(mockUsersRepository.create).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw 401 exception if user already exists', () => {
      // Given
      const createUserParams = {
        birthDay: new Date(),
        github: 'https://github.com/DevKor-Team',
        blog: 'https://5hongmin.tistory.com/',
        introduction: "hihi I'm user1",
        hobby: 'playing game',
        imageUrl: 's3.url',
        position: Position.Backend,
        mbti: Mbti.ENFJ,
      };

      mockUsersRepository.create.mockImplementationOnce(() => {
        throw new ConflictException();
      });

      // When
      usersService.createUser(createUserParams);

      // Then
      expect(mockUsersRepository.create).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('fetch user', () => {
    it('should fetch user with user id', () => {
      // Given
      const userId = 1;

      // When
      usersService.fetchUser(userId);

      // Then
      expect(usersService.find).toBeCalledWith(userId);
    });
    it('should throw 404 exception if user does not exist', () => {
      // Given
      const userId = 1;

      mockUsersRepository.find.mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      // When
      usersService.fetchUser(userId);

      // Then
      expect(usersService.find).rejects.toThrowError(NotFoundException);
    });
  });

  describe('fetch users', () => {
    it('should fetch users with query parameter', () => {
      // Given
      const fetchparams = {
        id: 1,
        position: Position.Backend,
        name: 'name1',
        mbti: Mbti.ENFJ,
      };

      // When
      usersService.fetchUsers(fetchparams);

      // Then
      expect(mockUsersRepository.find).toBeCalledWith(fetchparams);
    });
    it('should throw 400 exception if params are invalid', () => {
      // Given
      const fetchparams = {
        id: 'id1',
        position: Position.Backend,
        name: 'name1',
        mbti: Mbti.ENFJ,
      };
      mockUsersRepository.find.mockImplementationOnce(() => {
        throw new BadRequestException();
      });

      // When
      usersService.fetchUsers(fetchparams);

      // Then
      expect(mockUsersRepository.find).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('update user', () => {
    it('should update user with body', () => {
      // Given
      const userId = 1;
      const validBody = {
        major: 'Business',
        birthDay: new Date(),
        github: 'https://github.com/DevKor-Team',
        blog: 'https://google.com',
      };

      // When
      usersService.updateUser(userId, validBody);

      // Then
      expect(mockUsersRepository.update).toBeCalledWith(userId, validBody);
    });
    it('should throw 404 exception if user does not exist', () => {
      // Given
      const userId = 400;
      const validBody = {
        major: 'Business',
        birthDay: new Date(),
        github: 'https://github.com/DevKor-Team',
        blog: 'https://google.com',
      };

      mockUsersRepository.update.mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      // When
      usersService.updateUser(userId, validBody);

      // Then
      expect(mockUsersRepository.update).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('delete user', () => {
    it('should delete user with params', () => {
      // Given
      const userId = 1;

      // When
      usersService.deleteUser(userId);

      // Then
      expect(mockUsersRepository.delete).toBeCalledWith(userId);

  });

  it('should throw 404 exception if user does not exist', () => {
    // Given
    const userId = 1;
    mockUsersRepository.delete.mockImplementationOnce(()=>{
      throw new NotFoundException();
    })

    // When
    usersService.deleteUser(userId);

    // Then
    expect(mockUsersRepository.delete).rejects.toThrowError(NotFoundException);
  });
});
