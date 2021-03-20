import {
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { genSalt, hash } from 'bcrypt';

// Entity
import { User } from '../entities/user.entity';

// Dto
import { RegisterDto } from '../../auth/dto/register.dto';

// Interface
import { ValidCredentials } from '../../utils/interfaces/valid-credentials.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger(UserRepository.name);

  async register(registerDto: RegisterDto): Promise<void> {
    const { email, name, phone, password } = registerDto;

    if (await this.findByCondition({ email })) {
      this.logger.error(`Correo electrónico: ${email} duplicado.`);
      throw new ConflictException('Correo electrónico duplicado.');
    }

    if (await this.findByCondition({ name })) {
      this.logger.error(`Nombre: ${name} duplicado.`);
      throw new ConflictException('Nombre duplicado.');
    }

    const salt = await genSalt();

    const user = this.create();
    user.email = email.toLowerCase();
    user.name = name;
    user.phone = phone;
    user.password = await this.hashPassword(password, salt);

    try {
      await this.save(user);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<ValidCredentials> {
    try {
      const user = await this.findOne({ email });

      if (user && (await user.validatePassword(password))) {
        return { id: user.id, email: user.email, partner: user?.partner };
      } else {
        return null;
      }
    } catch (e) {
      this.logger.error(e.message);
      return null;
    }
  }

  async findById(id: number): Promise<User> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuario con ID #${id} no encontrado.`);
    }

    return user;
  }

  async findByCondition(condition: any): Promise<User> {
    return await this.findOne({ where: condition });
  }

  async updateUser(id: number, updateUserDto: RegisterDto): Promise<User> {
    const { email, name, password, phone } = updateUserDto;

    const user = await this.findById(id);

    const salt = await genSalt();

    user.email = email;
    user.name = name;
    user.password = await this.hashPassword(password, salt);
    user.phone = phone;

    return await this.save(user);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}
