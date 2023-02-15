import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date; 
}
