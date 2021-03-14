import {
  Check,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { Partner } from '../../partner/entities/partner.entity';
import { User } from '../../user/entities/user.entity';

// Enum
import { OperationTypeEnum } from '../enum/operation-type.enum';

@Entity()
@Check(
  `("operationType"='INS') OR ("operationType"='UPD') OR ("operationType"='DEL') OR ("operationType"='ACTIVE') OR ("operationType"='INACTIVE')`,
)
export class Auditoria {
  // Co_auditoria
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'Co_auditoria',
    unsigned: true,
  })
  id: number;

  // Nb_tabla
  @Column({ type: 'char', length: 255, nullable: false, name: 'Nb_tabla' })
  tableName: string;

  // Co_fila
  @Column({ type: 'bigint', nullable: true, name: 'Co_fila', unsigned: true })
  fileCode: number;

  // Co_tipo_operacion
  @Column({
    type: 'enum',
    nullable: false,
    name: 'Co_tipo_operacion',
    enum: OperationTypeEnum,
  })
  operationType: string;

  // Tx_sentencia
  @Column({
    type: 'varchar',
    length: 5000,
    nullable: false,
    name: 'Tx_sentencia',
  })
  sentence: string;

  // Tx_error
  @Column({ type: 'varchar', length: 5000, nullable: true, name: 'Tx_error' })
  error: string;

  // Co_MAC
  @Column({ type: 'char', length: 1, nullable: true, name: 'Co_MAC' })
  coMAC: string;

  // Co_IP
  @Column({ type: 'char', length: 40, nullable: true, name: 'Co_IP' })
  ipCode: string;

  // Fe_Ins
  @Column({
    type: 'datetime',
    name: 'Fe_Ins',
    default: () => 'CURRENT_TIMESTAMP',
  })
  insertionDate: Date;

  // St_error
  @Column({ type: 'tinyint', name: 'St_error', default: 0 })
  errorStatus: number;

  // Self Relations
  @OneToMany((type) => Auditoria, (auditoria) => auditoria.auditoria, {
    eager: true,
  })
  auditorias: Auditoria[];

  @ManyToOne((type) => Auditoria, (auditoria) => auditoria.auditorias, {
    eager: false,
  })
  auditoria: Auditoria;

  // User relation
  @OneToMany((type) => User, (user) => user.auditoria, {
    eager: true,
  })
  users: User[];

  // Partner relation
  @OneToMany((type) => Partner, (partner) => partner.auditoria, { eager: true })
  partners: Partner[];
}
