import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('account')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  phoneNumber: string;

  @Column()
  cnicNumber: string;

  @Column()
  idCardFrontImage: string;

  @Column()
  idCardBackImage: string;

  @Column()
  verify: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
