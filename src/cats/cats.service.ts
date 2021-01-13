import { Injectable } from '@nestjs/common';
import { ErrorMessage } from '../core/error-message';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(createCatDto: CreateCatDto) {
    this.cats.push(this.createEntity(createCatDto));
    return this.cats[this.cats.length - 1];
  }

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    const cat = this.cats.find((_cat) => _cat.id === id);
    if (cat == null) {
      return {
        error: new Error(ErrorMessage.EntityNotFound),
        cat: null,
      };
    }
    return {
      cat,
      error: null,
    };
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return this.cats.reduce((acc, cur) => {
      let cat = cur;
      if (cur.id === id) {
        cat = this.mergeEntity(cur, updateCatDto);
      }
      return acc;
    }, []);
  }

  remove(id: number) {
    return this.cats.reduce((acc, cur) => {
      if (cur.id !== id) {
        acc.push(cur);
      }
      return acc;
    }, []);
  }

  private createEntity(dto: CreateCatDto) {
    return new Cat(dto);
  }

  private mergeEntity(cat: Cat, dto: UpdateCatDto) {
    return new Cat({ ...cat, ...dto });
  }
}
