// src/cats/dto/create-cat.dto.ts
import { CatStatus } from '../entities/cat.entity';

export class CreateCatDto {
  name: string;
  status: CatStatus;
  age: number;
  image: string;
  color: string;
  weight: number;
  
  description?: string | string[];
  statusText?: string;
  character?: string;
  health?: string;
  story?: string;
}