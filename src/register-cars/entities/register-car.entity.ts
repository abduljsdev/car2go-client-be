import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CarCategories } from "../enum/register.car.enum";


@Entity('register-cars')
export class RegisterCar {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'integer'})
    userId:number

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
    passangerCapcity:number

    @Column()
    location:string

    @Column()
    image:string
    

}