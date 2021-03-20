import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserRepository } from '../user/repositories/user.repository';

// Passport Strategies
import { BasicStrategy } from './passport/strategies/basic.strategy';
import { JwtStrategy } from './passport/strategies/jwt.strategy';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1y' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserRepository]),
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    // Config
    ConfigService,
    // AuthService
    AuthService,
    // Strategies
    BasicStrategy,
    JwtStrategy,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
