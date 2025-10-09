// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { FileService } from '../file.service';
import type { Cat } from './entities/cat.entity';
import type { CreateCatDto } from './dto/create-cat.dto';
import type { UpdateCatDto } from './dto/update-cat.dto';

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

  private writeAll(items: Cat[]): void {
    this.fileService.write<Cat[]>(items);
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

  create(dto: CreateCatDto): Cat {
  const cats: Cat[] = this.readAll();
  const nextId = cats.length ? Math.max(...cats.map((c: Cat) => c.id)) + 1 : 1;
  const newCat: Cat = { id: nextId, ...dto };
  cats.push(newCat);
  this.writeAll(cats);
  return newCat;
  }

  update(id: number, dto: UpdateCatDto): Cat | null {
  const cats: Cat[] = this.readAll();
  const idx = cats.findIndex((c: Cat) => c.id === id);
  if (idx === -1) return null;

  const updated: Cat = { ...cats[idx], ...dto, id };
  cats[idx] = updated;
  this.writeAll(cats);
  return updated;
  }

  remove(id: number): { deleted: boolean } {
  const cats: Cat[] = this.readAll();
  const before = cats.length;
  const after = cats.filter((c: Cat) => c.id !== id);
  this.writeAll(after);
  return { deleted: after.length < before };
  }
}
