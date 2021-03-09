import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { Auditoria } from '../../utils/entities/auditoria.entity';
import { Bitacora } from '../../utils/entities/bitacora.entity';
import { Partner } from '../../partner/entities/partner.entity';

@Entity()
export class User {
  // Co_usuario
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'Co_usuario' })
  id: number;

  // Nb_usuario
  @Column({ type: 'char', length: 100, nullable: false, name: 'Nb_usuario' })
  name: string;

  // Tx_email
  @Column({ type: 'varchar', length: 500, nullable: false, name: 'Tx_email' })
  email: string;

  // Nu_movil
  @Column({ type: 'char', length: 20, nullable: false, name: 'Nu_movil' })
  phone: string;

  // Tx_clave
  @Column({ type: 'char', length: 100, nullable: false, name: 'Tx_clave' })
  password: string;

  // Tx_patron
  @Column({ type: 'char', length: 20, nullable: false, name: 'Tx_patron' })
  pattern: string;

  // Nu_intentos
  @Column({ type: 'int', length: 11, nullable: false, name: 'Nu_intentos' })
  attempts: number;

  // Fe_recuperacion
  @Column({ type: 'datetime', nullable: false, name: 'Fe_recuperacion' })
  recoveryDate: Date;

  // St_bloqueo
  @Column({ type: 'tinyint', nullable: false, name: 'St_bloqueo' })
  blockStatus: number;

  // St_activo
  @Column({ type: 'tinyint', nullable: false, name: 'St_activo' })
  activeStatus: number;

  // Auditoria relations
  @ManyToOne((type) => Auditoria, (auditoria) => auditoria.users, {
    eager: false,
  })
  auditoria: Auditoria;

  // Bitacora relations
  @OneToMany((type) => Bitacora, (bitacora) => bitacora.user, { eager: true })
  bitacoras: Bitacora[];

  // Partner relation
  @OneToMany((type) => Partner, (partner) => partner.user, { eager: true })
  partners: Partner[];
}
