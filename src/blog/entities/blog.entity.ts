import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blog')
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
