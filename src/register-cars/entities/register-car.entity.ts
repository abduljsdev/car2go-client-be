import { RentedCar } from "src/rented-cars/entities/rented-car.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CarCategories } from "../enum/register.car.enum";


@Entity('register-cars')
export class RegisterCar {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string;

    @Column()
    brandName:string

    @Column({type:'integer'})
    model:number

    @Column()
    number:string

    @Column({type:'boolean'})
    transmission:boolean

    @Column({type:'integer'})
    price:number

    @Column({type:'integer'})
    seats:number

    @Column({type:'integer'})
    fuelAverage:number

    @Column({type:'integer'})
    doors:number

    @Column({type:'boolean'})
    airCondition:boolean
    
    @Column({
        type: 'enum',
        enum: CarCategories,
    })
    category:CarCategories.SEDAN | CarCategories.SUV | CarCategories.VAN

    @Column({type:'integer'})
    luggageCapacity:number

    @Column({type:'integer'})
    passengerCapacity:number

    @Column()
    location:string

    @Column()
    image:string

    @ManyToOne(()=>User,(user)=>user.registerCars)
    user:User

    @Column()
    userId;

    @OneToMany(()=>RentedCar,(rentedCar)=>rentedCar.car)
    rented:RentedCar

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date; 
}
