import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { User } from '../../user/entities/user.entity';

@Entity()
export class Bitacora {
  // Co_Bitacora
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'Co_Bitacora' })
  id: number;

  // Fe_Ins
  @Column({ type: 'datetime', name: 'Fe_Ins' })
  insertionDate: Date;

  // Self Relations
  @OneToMany((type) => Bitacora, (bitacora) => bitacora.bitacora, {
    eager: true,
  })
  bitacoras: Bitacora[];

  @ManyToOne((type) => Bitacora, (bitacora) => bitacora.bitacoras, {
    eager: false,
  })
  bitacora: Bitacora;

  // User relation
  @ManyToOne((type) => User, (user) => user.bitacoras, { eager: false })
  user: User;
}
