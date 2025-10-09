// src/file.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor(private readonly filePath: string) {} // <- абсолютный путь!

  read<T>(): T {
    try {
      return JSON.parse(fs.readFileSync(this.filePath, 'utf8')) as T;
    } catch (e: any) {
      throw new InternalServerErrorException(
        `Cannot read data file at ${this.filePath}: ${e.message}`,
      );
    }
  }

  write<T>(data: T): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}