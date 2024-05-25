import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get('genre')
  async findAllGenres(): Promise<{ genre: string[]; }> {
    const genres = await this.moviesService.findAllGenres();
    return { genre: genres };
  }

  @Get(':genre')
  find(@Param('genre') genre: string): Promise<{ genre: string; }[]> {
    return this.moviesService.find(genre);
  }
}
