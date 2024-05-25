import { IsDateString, IsEmpty, IsString } from "class-validator";

export class CreateMovieDto {


    @IsString()
    @IsEmpty()
    title: string;


    @IsDateString()
    @IsEmpty()
    release_date: Date;

    @IsString()
    @IsEmpty()
    description: string;

    @IsString()
    @IsEmpty()
    genre: string;
}
