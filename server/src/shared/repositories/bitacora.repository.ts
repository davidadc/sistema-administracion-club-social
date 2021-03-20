import { EntityRepository, Repository } from 'typeorm';
import { Bitacora } from '../entities/bitacora.entity';

@EntityRepository(Bitacora)
export class BitacoraRepository extends Repository<Bitacora> {}
