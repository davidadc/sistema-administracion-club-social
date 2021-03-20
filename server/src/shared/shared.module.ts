import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Repositories
import { AuditoriaRepository } from './repositories/auditoria.repository';
import { BitacoraRepository } from './repositories/bitacora.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditoriaRepository, BitacoraRepository]),
  ],
  exports: [TypeOrmModule],
})
export class SharedModule {}
