import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CarCategories } from "../enum/register.car.enum";
import { Type } from 'class-transformer';

export class CreateRegisterCarDto {

    userId:number

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    brandName:string

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    model:number

    @IsNotEmpty()
    @IsString()
    number:string

    @IsNotEmpty()
    @Type(() => Boolean)
    transmission:boolean

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    price:number

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    seats:number

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    fuelAverage:number

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    doors:number

    @IsNotEmpty()
    category:CarCategories.SEDAN | CarCategories.SUV | CarCategories.VAN

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    luggageCapacity:number

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    passangerCapcity:number

    @IsNotEmpty()
    @IsString()
    location:string

     @IsOptional()
     image:string
    
}
