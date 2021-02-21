import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../classes/create-todo.dto';
import { TodoEntity } from '../classes/todo.entity';
import { UpdateTodoDto } from '../classes/update-todo.dto';

@Injectable()
export class TodoService {
  findList$() {
    return from(this.todoRepository.find());
  }

  findOne$(todoId: string) {
    return from(this.todoRepository.findOneOrFail(todoId)).pipe(
      map((todo) => ({ todo, error: null })),
      catchError((error) => of({ error, todo: null })),
    );
  }

  createOne$(createDto: CreateTodoDto) {
    const entity = this.todoRepository.create(createDto);
    return from(this.todoRepository.save(entity)).pipe(
      map((todo) => ({ todo, error: null })),
      catchError((error) =>
        of({
          todo: null,
          error,
        }),
      ),
    );
  }

  updateOne$(todoId: string, updateDto: UpdateTodoDto) {
    const entitiLike = this.todoRepository.create(updateDto);
    return from(this.todoRepository.findOne(todoId)).pipe(
      map((todo) => this.todoRepository.merge(todo, entitiLike)),
      exhaustMap((todo) => this.todoRepository.save(todo)),
      map((todo) => ({ todo, error: null })),
      catchError((error) => of({ error, todo: null })),
    );
  }

  deleteOne$(id: string) {
    return of(this.todoRepository.delete(id)).pipe(
      map(() => ({ todo: { id }, error: null })),
      catchError((error) => of({ error, todo: null })),
    );
  }

  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
}
