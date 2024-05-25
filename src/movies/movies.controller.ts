import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(createMovieDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('genre')
  async findAllGenres(): Promise<{ genre: string[]; }> {
    const genres = await this.moviesService.findAllGenres();
    return { genre: genres };
  }

  @UseGuards(AuthGuard)
  @Get(':genre')
  find(@Param('genre') genre: string): Promise<{ genre: string; }[]> {
    return this.moviesService.find(genre);
  }
}
