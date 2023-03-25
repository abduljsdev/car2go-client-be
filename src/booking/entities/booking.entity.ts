import { type } from 'os';
import { BookingStatus } from 'src/auth/enum/status.enum';
import { Car } from 'src/seller/entities/car.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('booking')
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column()
  location: string;

  @Column()
  deliverDate: string;

  @Column()
  deliverTime: string;

  @Column()
  returnDate: string;

  @Column()
  returnTime: string;

  @OneToOne(() => Car)
  @JoinColumn()
  car: Car;

  @Column()
  carId;

  @ManyToOne(() => User, (user) => user.booking)
  buyer: User;

  @Column()
  buyerId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
