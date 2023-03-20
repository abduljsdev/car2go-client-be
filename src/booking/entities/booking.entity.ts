import { RegisterCar } from 'src/register-cars/entities/register-car.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RegisterCar, (registerCar) => registerCar.rented)
  car: RegisterCar;

  @Column()
  carId;

  @ManyToOne(() => User, (user) => user.rentedBuyer)
  buyer: User;

  @Column()
  buyerId;

  @Column()
  status: string;
}
