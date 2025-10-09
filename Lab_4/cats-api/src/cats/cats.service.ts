// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { FileService } from '../file.service';
import type { Cat } from './entities/cat.entity';

export type ListFilters = {
  name?: string;
  status?: string;
  color?: string;
  minAge?: string; // придёт строкой из query
  maxAge?: string;
};

@Injectable()
export class CatsService {
  constructor(private fileService: FileService) {}

  private readAll(): Cat[] {
    return this.fileService.read<Cat[]>();
  }

  findAll(filters?: ListFilters): Cat[] {
    const cats: Cat[] = this.readAll();
    if (!filters) return cats;

    const { name, status, color, minAge, maxAge } = filters;

    return cats.filter((c: Cat) => {
      if (name && !c.name.toLowerCase().includes(name.toLowerCase())) return false;
      if (status && c.status !== status) return false;
      if (color && c.color.toLowerCase() !== color.toLowerCase()) return false;

      const min = minAge ? Number(minAge) : undefined;
      const max = maxAge ? Number(maxAge) : undefined;
      if (min !== undefined && c.age < min) return false;
      if (max !== undefined && c.age > max) return false;

      return true;
    });
  }

  findOne(id: number): Cat | null {
    const cats = this.fileService.read<Cat[]>();
    return cats.find((c) => c.id === id) ?? null;
  }

  /*update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }*/
}
