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
    event: InsertEvent<User> | UpdateEvent<User> | RemoveEvent<User>,
    operationType: string,
  ) {
    const auditoria = this.create();
    auditoria.tableName = event.metadata.tableName;
    auditoria.rowCode = event.entity.id;
    auditoria.operationType = operationType;

    try {
      await this.save(auditoria);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
