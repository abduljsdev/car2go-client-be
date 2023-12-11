import { BookingStatus } from 'src/auth/enum/status.enum';
import { Driver } from 'src/driver/entities/driver.entity';
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
  pickUpLocation: string;

  @Column()
  pickUpDate: string;

  @Column()
  pickUpTime: string;

  @Column()
  returnLocation: string;

  @Column()
  returnDate: string;

  @Column()
  returnTime: string;

  @OneToOne(() => Car, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  car: Car;

  @Column()
  carId;

  @ManyToOne(() => User, (user) => user.booking)
  buyer: User;

  @Column()
  buyerId;

  @OneToOne(() => Driver)
  @JoinColumn()
  driver: Driver;

  @Column()
  driverId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
