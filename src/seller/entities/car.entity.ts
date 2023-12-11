import { Account } from 'src/account/entities/account.entity';
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
import { CarCategories, CarTransmission } from '../enum/car.enum';

@Entity('car')
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brandName: string;

  @Column()
  model: string;

  @Column()
  number: string;

  @Column({
    type: 'enum',
    enum: CarTransmission,
  })
  transmission: CarTransmission;

  @Column()
  price: string;

  @Column()
  seats: string;

  @Column()
  fuelAverage: string;

  @Column()
  doors: string;

  @Column({ type: 'boolean' })
  airCondition: boolean;

  @Column({
    type: 'enum',
    enum: CarCategories,
  })
  category: CarCategories.SEDAN | CarCategories.SUV | CarCategories.VAN;

  @Column()
  luggageCapacity: string;

  @Column()
  passengerCapacity: string;

  @Column()
  location: string;

  @Column()
  image: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.car)
  user: User;

  @Column()
  userId;

  @OneToOne(() => Account)
  @JoinColumn()
  car: Account;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
