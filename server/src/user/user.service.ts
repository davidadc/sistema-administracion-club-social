import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entity
import { User } from './entities/user.entity';

// Repository
import { UserRepository } from './repositories/user.repository';

// Dto
// import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from '../auth/dto/register.dto';

/**
 * UsersService.
 *
 * Service that make calls to the UserRepository.
 */
@Injectable()
export class UserService {
  /**
   * Create UserService
   *
   * @param {UserRepository} userRepository
   */
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Query to return all users in the DB.
   *
   * @returns {User[]}
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Query to return one user by id
   *
   * @param {number} id
   *
   * @returns {User}
   */
  async findOne(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  /**
   * Update user fields.
   *
   * @param {number} id
   * @param {RegisterDto} updateUserDto
   *
   * @returns {User}
   */
  async update(id: number, updateUserDto: RegisterDto): Promise<User> {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  /**
   * Query to delete user by its id
   *
   * @param id
   *
   * @returns {void}
   */
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
}
