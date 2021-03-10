import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { BasicStrategy as Strategy } from 'passport-http';

// Repository
import { UserRepository } from '../../../user/repositories/user.repository';

// Utils
import { ValidCredentials } from '../../../utils/interfaces/valid-credentials.interface';

/**
 * BasicStrategy.
 *
 * Injectable that implements the Passport Middleware.
 *
 * This one implements the 'passport-http' strategy for users authentication.
 */
@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  /**
   * Create Basic Strategy
   *
   * @param {UserRepository} userRepository
   */
  constructor(private userRepository: UserRepository) {
    super();
  }

  /**
   * Method that executes on login and extracts username and password from Basic Auth via Authorization Header.
   *
   * @param {string} username - email of the user
   * @param {string} password - password of the user
   *
   * @throws {UnauthorizedException} - The credentials submitted are invalid.
   *
   * @returns {ValidCredentials} Object with information of the logged-in user.
   */
  async validate(
    username: string,
    password: string,
  ): Promise<ValidCredentials> {
    const user = await this.userRepository.validateCredentials(
      username.toLowerCase(),
      password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    return user;
  }
}
