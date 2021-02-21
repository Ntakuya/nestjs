import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todoes')
export class TodoEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  title: string;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  description: string;

  @ApiProperty()
  @CreateDateColumn({
    name: 'created_at',
  })
  readonly createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  readonly updatedAt: Date;
}
