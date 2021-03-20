import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

// Repository
import { UserRepository } from '../user/repositories/user.repository';

// Dto
import { RegisterDto } from './dto/register.dto';
import { ValidCredentials } from '../utils/interfaces/valid-credentials.interface';
import { AuditoriaRepository } from '../shared/repositories/auditoria.repository';
import { User } from '../user/entities/user.entity';
import { OperationTypeEnum } from '../utils/enum/operation-type.enum';

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
   * @param {AuditoriaRepository} auditoriaRepository
   * @param {JwtService} jwtService
   */
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AuditoriaRepository)
    private readonly auditoriaRepository: AuditoriaRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Call the UserRepository to register a new User
   *
   * @param {RegisterDto} registerDto - Dto that contains Register credentials validated fields.\
   * @param {string[]} clientIpMac
   *
   * @returns {void}
   */
  async register(registerDto: RegisterDto, clientIpMac: string[]): Promise<void> {
    const [user, sql] = await this.userRepository.register(registerDto);
    await this.auditoriaRepository.createRegister(
      User.name,
      user.id,
      OperationTypeEnum.INSERTION,
      sql,
      null,
      user,
      clientIpMac[0],
      clientIpMac[1],
      null,
    );
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
