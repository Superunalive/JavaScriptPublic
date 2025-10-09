import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import type { ListFilters } from './cats.service';
import type { Cat } from './entities/cat.entity';
import type { CreateCatDto } from './dto/create-cat.dto';
import type { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /*@Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }*/

  @Get()
  findAll(@Query() q: ListFilters): Cat[] {
    return this.catsService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Cat | null {
    return this.catsService.findOne(+id);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }*/
}
