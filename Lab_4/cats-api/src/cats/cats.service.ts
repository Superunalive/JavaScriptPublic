// src/cats/cats.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
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

  private buildDescription(input: {
    description?: unknown;
    statusText?: unknown;
    character?: unknown;
    health?: unknown;
    story?: unknown;
  }): string[] {
    const toItem = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
    const base =
      Array.isArray(input.description)
        ? input.description.map(toItem).filter(Boolean)
        : typeof input.description === 'string' && input.description.trim()
        ? [input.description.trim()]
        : [];

    const extras = [input.statusText, input.character, input.health, input.story]
      .map(toItem)
      .filter(Boolean);

    // уникализируем
    return Array.from(new Set([...base, ...extras]));
  }
private readAll(): Cat[] {
  const arr = this.fileService.read<any[]>() ?? [];

  const numOr = (v: any): number | undefined => {
    if (typeof v === 'number') return v;
    if (typeof v === 'string') {
      const m = v.replace(',', '.').match(/[+-]?\d+(\.\d+)?/);
      if (m) return Number(m[0]);
    }
    return undefined;
  };

  return arr.map((c: any) => ({
    id: Number(c.id),
    name: String(c.name),
    status: c.status as Cat['status'],
    age: numOr(c.age) ?? 0,
    image: String(c.image),
    color: String(c.color),
    weight: numOr(c.weight) ?? 0,
    description: this.buildDescription(c), // ← важное место
  })) as Cat[];
}

  private writeAll(items: Cat[]): void {
    this.fileService.write<Cat[]>(items);
  }
 
// стало (универсально и работает с любыми query-параметрами)
findAll(filters?: Record<string, unknown>): Cat[] {
  const cats: Cat[] = this.readAll();
  if (!filters) return cats;

  const normStr = (v: any): string | undefined =>
    typeof v === 'string' ? v.trim().toLowerCase() || undefined : undefined;

  const asNum = (v: any, name: string): number | undefined => {
    if (v === undefined || v === null || v === '') return undefined;
    const n = Number(v);
    if (Number.isNaN(n)) throw new BadRequestException( `${name} must be a number`);
    return n;
  };

  const name = normStr(filters.name);
  const color = normStr(filters.color);
  const status = normStr(filters.status);
  const age = asNum(filters.age, 'age');
  const minAge = asNum(filters.minAge, 'minAge');
  const maxAge = asNum(filters.maxAge, 'maxAge');
  const minWeight = asNum(filters.minWeight, 'minWeight');
  const maxWeight = asNum(filters.maxWeight, 'maxWeight');

  return cats.filter((c) => {
    if (name && !c.name.toLowerCase().includes(name)) return false;
    if (color && !c.color.toLowerCase().includes(color)) return false;
    if (status && c.status.toLowerCase() !== status) return false;

    if (age !== undefined && c.age !== age) return false;
    if (minAge !== undefined && c.age < minAge) return false;
    if (maxAge !== undefined && c.age > maxAge) return false;

    if (minWeight !== undefined && c.weight < minWeight) return false;
    if (maxWeight !== undefined && c.weight > maxWeight) return false;

    return true;
  });
}

  findOne(id: number): Cat | null {
    const cats = this.fileService.read<Cat[]>();
    return cats.find((c) => c.id === id) ?? null;
  }

create(dto: CreateCatDto): Cat {
  const cats: Cat[] = this.readAll();
  const nextId = cats.length ? Math.max(...cats.map((c) => c.id)) + 1 : 1;
  const newCat: Cat = {
    id: nextId,
    name: dto.name,
    status: dto.status,
    age: Number(dto.age),
    image: dto.image,
    color: dto.color,
    weight: Number(dto.weight),
    description: this.buildDescription(dto),
  };
  cats.push(newCat);
  this.writeAll(cats);
  return newCat;
}

// update — объединяем старое описание с новым, если нужно
// ОБНОВИТЬ update() (кусочек внутри)
update(id: number, dto: UpdateCatDto): Cat | null {
  const cats: Cat[] = this.readAll();
  const idx = cats.findIndex((c) => c.id === id);
  if (idx === -1) return null;

  const patch: Partial<Cat> = { ...dto } as any;

  const hasAnyDescInput =
    'description' in dto || 'statusText' in dto || 'character' in dto || 'health' in dto || 'story' in dto;

  if (hasAnyDescInput) {
    patch.description = this.buildDescription(dto);
  }
  if ('age' in dto) patch.age = Number(dto.age as any);
  if ('weight' in dto) patch.weight = Number(dto.weight as any);

  const updated: Cat = { ...cats[idx], ...patch, id };
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
