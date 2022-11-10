import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserParams } from './dto/create-users.dto';
import { UsersController } from './users.controller';
import { Position, Role } from './users.enum';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  const mockUsersService = {
    createUser: jest.fn(),
    fetchUser: jest.fn(),
    fetchUsers: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create user', () => {
    it('should call createUser() with valid params', () => {
      //Given
      const validParams = {
        name: 'user1',
        major: 'Computer Science',
        birthDay: new Date(),
        github: 'https://github.com/DevKor-Team',
        role: Role.User,
      };

      // When
      usersController.createUser(validParams);

      // Then
      expect(mockUsersService.createUser).toBeCalledWith(validParams);
    });

    it('should throw 400 exception if params are invalid', () => {
      //Given
      const invalidParams = {
        name: 'user1',
        major: 'Computer Science',
        github: 'https://github.com/DevKor-Team',
        role: Role.User,
      };

      // When
      usersController.createUser(invalidParams);

      // Then
      expect(mockUsersService.createUser).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('fetch user', () => {
    it('should call fetchUser() with user id', () => {
      //Given
      const userId = 1;

      // When
      usersController.fetchUser(userId);

      // Then
      expect(mockUsersService.fetchUser).toBeCalledWith(userId);
    });

    it('should throw 400 exception if userId is not integer', () => {
      //Given
      const userId = '1';

      // When
      usersController.fetchUser(userId);

      // Then
      expect(mockUsersService.fetchUser).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('fetch users', () => {
    it('should call fetchUsers() with query parameter', () => {
      //Given
      const validQuery = {
        name: 'user1',
        position: Position.Backend,
      };

      // When
      usersController.fetchUsers(validQuery);

      // Then
      expect(mockUsersService.fetchUsers).toBeCalledWith(validQuery);
    });

    it('should throw 400 exception if query is invalid', () => {
      //Given
      const invalidQuery = {
        age: 36,
      };

      // When
      usersController.fetchUsers(invalidQuery);

      // Then
      expect(mockUsersService.fetchUsers).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('update user', () => {
    it('should call updateUser() with body', () => {
      //Given
      const userId = 1;

      const validBody = {
        major: 'Business',
        birthDay: new Date(),
        github: 'https://github.com/DevKor-Team',
        blog: 'https://google.com',
      };

      // When
      usersController.updateUser(userId, validBody);

      // Then
      expect(mockUsersService.updateUser).toBeCalledWith(userId, validBody);
    });

    it('should throw 400 exception if body is invalid', () => {
      //Given
      const userId = 1;

      const invalidBody = {
        major: 'Business',
        birthDay: new Date(),
        github: 'https://github.com/DevKor-Team',
        blog: 'https://google.com',
        name: 'user1',
      };

      // When
      usersController.updateUser(userId, invalidBody);

      // Then
      expect(mockUsersService.updateUser).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw 400 exception if userId is invalid', () => {
      //Given
      const userId = '1';

      const validBody = {
        major: 'Business',
        birthDay: new Date(),
        github: 'https://github.com/DevKor-Team',
        blog: 'https://google.com',
      };

      // When
      usersController.updateUser(userId, validBody);

      // Then
      expect(mockUsersService.updateUser).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('delete user', () => {
    it('should call deleteUser() with params', () => {
      //Given
      const userId = 1;

      // When
      usersController.deleteUser(userId);

      // Then
      expect(mockUsersService.updateUser).toBeCalledWith(userId);
    });

    it('should throw 400 exception if param is invalid', () => {
      //Given
      const userId = '1';

      // When
      usersController.deleteUser(userId);

      // Then
      expect(mockUsersService.updateUser).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
