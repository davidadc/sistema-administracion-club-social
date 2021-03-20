import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Bitacora } from '../entities/bitacora.entity';

@EntityRepository(Bitacora)
export class BitacoraRepository extends Repository<Bitacora> {
  private logger = new Logger(BitacoraRepository.name);

  async createRegister(prevBitacora, u: User) {
    const bitacora = this.create();
    bitacora.bitacora = prevBitacora;
    bitacora.user = u;

    try {
      await this.save(bitacora);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
