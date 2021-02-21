import { ApiProperty } from '@nestjs/swagger';
import { TodoEntity } from './todo.entity';

export class GetTodoListResponse {
  @ApiProperty({ type: [TodoEntity] })
  todoes: TodoEntity[];
}
