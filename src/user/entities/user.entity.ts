import { RegisterCar } from 'src/register-cars/entities/register-car.entity';
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

  @Column({type:'numeric'})
  phone:number

  @Column()
  address:string

  @Column({type:'integer'})
  age:number

  @Column()
  gender:string

  @Column()
  role: string;

  @Column()
  image:string

  @OneToMany(()=>RegisterCar,(registerCar)=>registerCar.user)
  registerCars:RegisterCar[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date; 
}
