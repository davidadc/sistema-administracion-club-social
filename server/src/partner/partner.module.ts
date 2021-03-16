import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';

import { AuthModule } from '../auth/auth.module';

// Repository
import { PartnerRepository } from './repositories/partner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerRepository]), AuthModule],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [TypeOrmModule],
})
export class PartnerModule {}
