import {
  ConflictException,
  InternalServerErrorException,
  Logger,
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

    const salt = await genSalt();

    const user = this.create();
    user.email = email.toLowerCase();
    user.name = name;
    user.phone = phone;
    user.password = await this.hashPassword(password, salt);

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Duplicate username
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<ValidCredentials> {
    try {
      const user = await this.findOne({ email });

      if (user && (await user.validatePassword(password))) {
        return { id: user.id, email: user.email };
      } else {
        return null;
      }
    } catch (e) {
      this.logger.error(e.message);
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}
