// src/cats/cats.module.ts
import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { FileService } from '../file.service';
import * as path from 'path';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: FileService,
      useFactory: () => {
        const absPath = path.resolve(__dirname, 'assets', 'cats.json');
        return new FileService(absPath)
      },
    },
  ],
})
export class CatsModule {}