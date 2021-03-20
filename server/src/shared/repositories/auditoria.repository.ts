import {
  EntityRepository,
  InsertEvent,
  RemoveEvent,
  Repository,
  UpdateEvent,
} from 'typeorm';
import { Auditoria } from '../entities/auditoria.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

@EntityRepository(Auditoria)
export class AuditoriaRepository extends Repository<Auditoria> {
  private logger = new Logger(AuditoriaRepository.name);

  async createRegister(
    tableName: string,
    row: number,
    operationType: string,
    sentence: string,
    error: string,
    u: User,
    ip: any,
    mac: any,
    prevAuditoria,
  ) {
    const auditoria = this.create();
    auditoria.tableName = tableName;
    auditoria.rowCode = row;
    auditoria.operationType = operationType;
    auditoria.sentence = sentence;
    auditoria.error = error;
    auditoria.users = [u];
    auditoria.ipCode = ip;
    console.log(mac)
    auditoria.coMAC = mac;
    auditoria.auditoria = prevAuditoria;

    try {
      await this.save(auditoria);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
