import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

// Repository
import { UserRepository } from '../user/repositories/user.repository';

// Dto
import { RegisterDto } from './dto/register.dto';
import { ValidCredentials } from '../utils/interfaces/valid-credentials.interface';

/**
 * AuthService.
 *
 * Service that make calls to the UserRepository.
 *
 * It also signs the JWT with the JwtService on login.
 */
@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  /**
   * Create AuthService
   *
   * @param {UserRepository} userRepository
   * @param {JwtService} jwtService
   */
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Call the UserRepository to register a new User
   *
   * @param {RegisterDto} registerDto - Dto that contains Register credentials validated fields.
   *
   * @returns {void}
   */
  register(registerDto: RegisterDto): Promise<void> {
    return this.userRepository.register(registerDto);
  }

  /**
   * Sign JWT with the information of the user.
   *
   * @param {ValidCredentials} credentials - User object extracted from request via Basic Strategy.
   *
   * @returns {string} signed JWT
   */
  async login(credentials: ValidCredentials): Promise<string> {
    const { id, email } = credentials;
    const payload = { sub: id, email };

    this.logger.debug(
      `Generated JWT Token with payload: ${JSON.stringify(payload)}`,
    );

    return this.jwtService.sign(payload);
  }
}
