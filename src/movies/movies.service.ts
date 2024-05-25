import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) { }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const newMovie = this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(newMovie);
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async find(genre: string): Promise<{ genre: string; }[]> {
    const movies = await this.movieRepository.find({
      where: { genre: ILike(`%${genre}%`) },
    }); // now it won't create issues if I use small case or not :)
    return movies.map((movie) => movie);
  }

  async findAllGenres(): Promise<string[]> {
    const movies = await this.movieRepository.find();

    const genres = movies.map((movie) => movie.genre);

    const uniqueGenres = [...new Set(genres)];

    return uniqueGenres;
  }
}
