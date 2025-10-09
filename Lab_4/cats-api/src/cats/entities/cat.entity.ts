// src/cats/entities/cat.entity.ts
export type CatStatus = 'available' | 'adopted' | 'treatment';

export class Cat {
  id: number;
  name: string;
  status: CatStatus;
  age: number;
  image: string;
  color: string;
  weight: number;
  description: string[];
}