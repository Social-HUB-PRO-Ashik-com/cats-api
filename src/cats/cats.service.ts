import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './types/cat.type';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    {
      id: 1,
      name: 'Michi',
      age: 2,
      breed: 'Siames',
    },
    {
      id: 2,
      name: 'Luna',
      age: 3,
      breed: 'Persa',
    },
  ];

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);

    if (!cat) {
      throw new NotFoundException('Cat not found');
    }

    return cat;
  }

  create(createCatDto: CreateCatDto): Cat {
    const newCat: Cat = {
      id: this.cats.length + 1,
      ...createCatDto,
    };

    this.cats.push(newCat);

    return newCat;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const cat = this.findOne(id);

    Object.assign(cat, updateCatDto);

    return cat;
  }

  remove(id: number): void {
    this.cats = this.cats.filter((cat) => cat.id !== id);
  }
}