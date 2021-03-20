import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entity
import { User } from './entities/user.entity';

// Repository
import { UserRepository } from './repositories/user.repository';

// Dto
// import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { AuditoriaRepository } from '../shared/repositories/auditoria.repository';
import { OperationTypeEnum } from '../utils/enum/operation-type.enum';

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
   * @param {AuditoriaRepository} auditoriaRepository
   */
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AuditoriaRepository)
    private readonly auditoriaRepository: AuditoriaRepository,
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
   * @param {string} clientIpMac
   *
   * @returns {User}
   */
  async update(
    id: number,
    updateUserDto: RegisterDto,
    clientIpMac: string[],
  ): Promise<User> {
    const [user, sql] = await this.userRepository.updateUser(id, updateUserDto);
    await this.auditoriaRepository.createRegister(
      User.name,
      user.id,
      OperationTypeEnum.UPDATE,
      sql,
      null,
      user,
      clientIpMac[0],
      clientIpMac[1],
      null,
    );
    return user;
  }

  /**
   * Query to delete user by its id
   *
   * @param id
   * @param {string} clientIpMac
   *
   * @returns {void}
   */
  async remove(id: number, clientIpMac: string[]): Promise<void> {
    const [user, sql] = await this.userRepository.deleteUser(id);
    await this.auditoriaRepository.createRegister(
      User.name,
      user.id,
      OperationTypeEnum.DELETE,
      sql,
      null,
      user,
      clientIpMac[0],
      clientIpMac[1],
      null,
    );
  }
}
