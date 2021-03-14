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
   * Query to return all users by id
   *
   * @param {number} id
   *
   * @returns {User}
   */
  async findOne(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async update(id: number, updateUserDto: RegisterDto) {
    const { email, name, password, phone } = updateUserDto;

    const user = await this.userRepository.findById(id);

    user.email = email;
    user.name = name;
    user.password = password;
    user.phone = phone;

    return await this.userRepository.save(user);
  }

  /**
   * Query to delete user by its id
   *
   * @param id
   */
  async remove(id: number) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
}
