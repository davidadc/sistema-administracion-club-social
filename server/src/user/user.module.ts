import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSubscriber } from './entities/user.subscriber';

import { UserRepository } from './repositories/user.repository';

import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [TypeOrmModule],
})
export class UserModule {}
