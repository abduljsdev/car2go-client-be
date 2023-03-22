import { Booking } from 'src/booking/entities/booking.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarCategories } from '../enum/car.enum';

@Entity('car')
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brandName: string;

  @Column({ type: 'integer' })
  model: number;

  @Column()
  number: string;

  @Column({ type: 'boolean' })
  transmission: boolean;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'integer' })
  seats: number;

  @Column({ type: 'integer' })
  fuelAverage: number;

  @Column({ type: 'integer' })
  doors: number;

  @Column({ type: 'boolean' })
  airCondition: boolean;

  @Column({
    type: 'enum',
    enum: CarCategories,
  })
  category: CarCategories.SEDAN | CarCategories.SUV | CarCategories.VAN;

  @Column({ type: 'integer' })
  luggageCapacity: number;

  @Column({ type: 'integer' })
  passengerCapacity: number;

  @Column()
  location: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.car)
  user: User;

  @Column()
  userId;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
