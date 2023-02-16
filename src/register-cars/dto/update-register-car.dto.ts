import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CarCategories } from "../enum/register.car.enum";

export class UpdateRegisterCarDto {

    user:any

    @IsOptional()
    @IsString()
    name:string;

    @IsOptional()
    @IsString()
    brandName:string

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    model:number

    @IsOptional()
    @IsString()
    number:string

    @IsOptional()
    @Type(()=> Boolean)
    transmission:boolean

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price:number

    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    seats:number

    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    fuelAverage:number

    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    doors:number

    @IsOptional()
    category:CarCategories.SEDAN | CarCategories.SUV | CarCategories.VAN

    @IsOptional()
    @IsNumber()
    @Type(()=> Number)
    luggageCapacity:number

    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    passangerCapcity:number

    @IsOptional()
    @IsString()
    location:string

     @IsOptional()
     image:string
}
