import { RegisterCar } from 'src/register-cars/entities/register-car.entity';
import { RentedCar } from 'src/rented-cars/entities/rented-car.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
@Index(['email', 'role'], { unique: true }) // Here
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({select:false})
  password: string;

  @Column()
  verification_code: string;

  @Column()
  expiry_time: string;

  @Column()
  role: string;

  @OneToMany(()=>RegisterCar,(registerCar)=>registerCar.user)
  registerCars:RegisterCar[]

  @OneToMany(()=>RentedCar,(rentedCar)=>rentedCar.buyer)
  rentedBuyer:RentedCar[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date; 
}
