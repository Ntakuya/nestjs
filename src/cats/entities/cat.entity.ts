import { CreateCatDto } from '../dto/create-cat.dto';

export class Cat {
  id: number;
  name: string;
  age: number;
  breed: string;

  constructor(dto: CreateCatDto) {
    const { name, age, breed } = dto;
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.id = this.generateId();
  }

  private generateId() {
    return Math.ceil(Math.random() * 1000);
  }
}
