import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

// Entities
import { Auditoria } from '../../utils/entities/auditoria.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@Unique(['email', 'identificationCode'])
export class Partner {
  // Co_socio
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'Co_socio', unsigned: true })
  id: number;

  // Nb_socio
  @Column({ type: 'char', length: 100, nullable: false, name: 'Nb_socio' })
  name: string;

  // Co_identificacion
  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    name: 'Co_identificacion',
  })
  identificationCode: string;

  // Tx_email
  @Column({ type: 'varchar', length: 500, nullable: false, name: 'Tx_email' })
  email: string;

  // Nu_movil
  @Column({ type: 'char', length: 20, nullable: true, name: 'Nu_movil' })
  phone: string;

  // Nu_calificacion
  @Column({ type: 'int', nullable: false, name: 'Nu_calificacion', default: 0 })
  qualification: number;

  // St_bloqueo
  @Column({ type: 'tinyint', nullable: true, name: 'St_bloqueo', default: 0 })
  blockStatus: number;

  // St_activo
  @Column({ type: 'tinyint', nullable: false, name: 'St_activo', default: 1 })
  activeStatus: number;

  // User relation
  @ManyToOne((type) => User, (user) => user.partners, { eager: false })
  user: User;

  // Auditoria Relation
  @ManyToOne((type) => Auditoria, (auditoria) => auditoria.partners, {
    eager: false,
  })
  auditoria: Auditoria;
}
