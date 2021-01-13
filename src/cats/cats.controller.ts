import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseFilters,
  ParseIntPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../core/http-exception.filter';
import { ForbiddenException } from '..//core/forbidden.exception';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    throw new ForbiddenException();
    // return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    id: number,
  ) {
    const { error, cat } = this.catsService.findOne(id);
    if (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'NOT_FOUND',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return cat;
  }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id: number,
  ) {
    return this.catsService.remove(id);
  }
}
