import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CatsService } from './cats.service';
import type { ListFilters } from './cats.service';
import type { Cat } from './entities/cat.entity';
import type { CreateCatDto } from './dto/create-cat.dto';
import type { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): Cat {
    return this.catsService.create(createCatDto);
  }

 @Get()
findAll(@Query() q: Record<string, unknown>) {
  // console.log('QUERY:', q); // ← включи на время, чтобы увидеть, что реально приходит
  return this.catsService.findAll(q);
}

  @Get(':id')
findOne(@Param('id', ParseIntPipe) id: number): Cat {
  const found = this.catsService.findOne(id);
  if (!found) throw new NotFoundException(`Cat with id=${id} not found`);
  return found;
}

@Patch(':id')
update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCatDto): Cat {
  const updated = this.catsService.update(id, dto);
  if (!updated) throw new NotFoundException(`Cat with id=${id} not found`);
  return updated;
}

@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number): { deleted: boolean } {
  const res = this.catsService.remove(id);
  if (!res.deleted) throw new NotFoundException(`Cat with id=${id} not found`);
  return res;
}
}
