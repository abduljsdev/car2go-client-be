import { Account } from 'src/account/entities/account.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { Car } from 'src/seller/entities/car.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from '../enum/user.enum';

@Entity('user')
@Index(['email', 'role'], { unique: true })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  verification_code: string;

  @Column()
  expiry_time: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  role: UserType;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;

  @OneToMany(() => Car, (car) => car.user)
  car: Car[];

  @OneToMany(() => Booking, (booking) => booking.buyer)
  booking: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
