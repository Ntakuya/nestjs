import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateTodoDto } from '../classes/create-todo.dto';
import { UpdateTodoDto } from '../classes/update-todo.dto';
import { TodoService } from '../services/todo.service';

@Controller('todos')
export class TodoController {
  @Get('')
  index() {
    return this.todoService.findList$().pipe(map((todos) => ({ todos })));
  }

  @Get(':todoId')
  show(@Param('todoId') id: string) {
    return this.todoService.findOne$(id);
  }

  @Post('')
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createOne$(createTodoDto).pipe(
      map(({ todo, error }) => {
        if (error) {
          return throwError(
            new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error,
              },
              HttpStatus.BAD_REQUEST,
            ),
          );
        }
        return { success: true, todo };
      }),
    );
  }

  @Put(':todoId')
  update(@Param('todoId') id: string, @Body() updateTodo: UpdateTodoDto) {
    return this.todoService.updateOne$(id, updateTodo).pipe(
      map(({ todo, error }) => {
        if (error) {
          return throwError(
            new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error,
              },
              HttpStatus.BAD_REQUEST,
            ),
          );
        }
        return { success: true, todo };
      }),
    );
  }

  @Delete(':todoId')
  delete(@Param('todoId') id: string) {
    return this.todoService.deleteOne$(id).pipe(
      map(({ todo, error }) => {
        if (error) {
          return throwError(
            new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error,
              },
              HttpStatus.BAD_REQUEST,
            ),
          );
        }
        return { success: true, todo };
      }),
    );
  }

  constructor(private readonly todoService: TodoService) {}
}
