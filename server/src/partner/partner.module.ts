import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';

import { AuthModule } from '../auth/auth.module';

// Repository
import { PartnerRepository } from './repositories/partner.repository';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerRepository]), AuthModule, SharedModule],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [TypeOrmModule],
})
export class PartnerModule {}
