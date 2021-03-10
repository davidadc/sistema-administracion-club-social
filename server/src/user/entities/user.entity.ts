import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { compare } from 'bcrypt';

// Entities
import { Auditoria } from '../../utils/entities/auditoria.entity';
import { Bitacora } from '../../utils/entities/bitacora.entity';
import { Partner } from '../../partner/entities/partner.entity';

@Entity()
@Unique(['email'])
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
  @Column({ type: 'int', nullable: false, name: 'Nu_intentos' })
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
  @ManyToOne((type) => Auditoria, (auditoria) => auditoria.users)
  auditoria: Auditoria;

  // Bitacora relations
  @OneToMany((type) => Bitacora, (bitacora) => bitacora.user)
  bitacoras: Bitacora[];

  // Partner relation
  @OneToMany((type) => Partner, (partner) => partner.user, { eager: true })
  partners: Partner[];

  /**
   * Compare the password submitted with the one stored in db and hashed
   *
   * @param loginPass
   *
   * @returns {boolean} validation for compare the password stored in db and the login pass submitted
   */
  async validatePassword(loginPass: string): Promise<boolean> {
    return await compare(loginPass, this.password);
  }
}
