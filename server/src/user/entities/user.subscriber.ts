import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';

// Entity
import { User } from './user.entity';

// Repository
import { AuditoriaRepository } from '../../shared/repositories/auditoria.repository';

// Enum
import { OperationTypeEnum } from '../../utils/enum/operation-type.enum';

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectRepository(AuditoriaRepository)
    private readonly auditoriaRepository: AuditoriaRepository,
  ) {
    connection.subscribers.push(this);
  }

  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return User;
  }

  /**
   * Called after entity insertion.
   */
  async afterInsert(event: InsertEvent<User>) {
    await this.auditoriaRepository.createRegister(
      event,
      OperationTypeEnum.INSERTION,
    );
  }

  /**
   * Called after entity update.
   */
  async afterUpdate(event: UpdateEvent<User>) {
    await this.auditoriaRepository.createRegister(
      event,
      OperationTypeEnum.UPDATE,
    );
  }

  /**
   * Called after entity removal.
   */
  async afterRemove(event: RemoveEvent<User>) {
    await this.auditoriaRepository.createRegister(
      event,
      OperationTypeEnum.DELETE,
    );
  }
}
