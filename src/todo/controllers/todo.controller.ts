import { Controller, Get, Post } from '@nestjs/common';
import { of } from 'rxjs';

@Controller('todo')
export class TodoController {
  @Get('/')
  index() {
    return of([]);
  }

  @Post('/')
  create() {
    return of({});
  }
}
