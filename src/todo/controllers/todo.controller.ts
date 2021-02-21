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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateTodoDto } from '../classes/create-todo.dto';
import { GetTodoListResponse } from '../classes/get-todo-list-response';
import { TodoEntity } from '../classes/todo.entity';
import { UpdateTodoDto } from '../classes/update-todo.dto';
import { TodoService } from '../services/todo.service';

@ApiTags('todo')
@Controller('todos')
export class TodoController {
  @Get('')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: GetTodoListResponse,
  })
  index() {
    return this.todoService.findList$().pipe(map((todoes) => ({ todoes })));
  }

  @Get(':todoId')
  @ApiNotFoundResponse({ description: 'Todo has is not found.' })
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: TodoEntity,
  })
  show(@Param('todoId') id: string) {
    return this.todoService.findOne$(id).pipe(
      map(({ todo, error }) => {
        if (todo === null) {
          return throwError(
            new HttpException(
              {
                status: HttpStatus.NOT_FOUND,
                error,
              },
              HttpStatus.NOT_FOUND,
            ),
          );
        }
        return todo;
      }),
    );
  }

  @Post('')
  @ApiCreatedResponse({
    type: TodoEntity,
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Request Body is invalid' })
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
  @ApiBadRequestResponse({ description: 'Request Body is invalid' })
  @ApiNotFoundResponse({ description: 'Todo has is not found.' })
  @ApiCreatedResponse({
    type: TodoEntity,
    description: 'The record has been successfully created.',
  })
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
  @ApiNotFoundResponse({ description: 'Todo has is not found.' })
  @ApiCreatedResponse({
    type: TodoEntity,
    description: 'The record has been successfully created.',
  })
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
