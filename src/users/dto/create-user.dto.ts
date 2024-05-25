import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from "../user.entity";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;


    role?: UserRole;

}