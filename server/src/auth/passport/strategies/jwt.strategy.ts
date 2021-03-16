import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from '../../../user/repositories/user.repository';

/**
 * JwtStrategy.
 *
 * Injectable that implements the Passport Middleware.
 *
 * This one implements the 'passport-jwt' strategy to authorize if the endpoint can be accessed by a valid request.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Create Jwt Strategy
   *
   * @param {ConfigService} configService
   * @param {UserRepository} userRepository
   */
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Method that executes on requests protected with JWT strategy and extracts the JWT token from Auth Header as Bearer Token
   *
   * @param {any} payload - decoded JWT information
   *
   * @returns {object} object with userId and email of the user that will be injected in the Request as "user" field.
   */
  async validate(payload: any) {
    const { sub } = payload;
    const user = await this.userRepository.findOne({
      select: ['id', 'name', 'email', 'phone'],
      where: { id: sub },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
