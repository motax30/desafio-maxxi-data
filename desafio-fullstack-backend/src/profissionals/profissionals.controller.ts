import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { Profissional } from '../entity/profissional.entity';
import { CreateProfissionalDto } from '../dto/create-profissionaldto.ts';
import { ProfissionalsService } from './profissionals.service';

@Controller('profissionals')
export class ProfissionalController {
    constructor(private readonly profissionalService: ProfissionalsService) {}

    @Post()
    create(@Body() createProfessionalDto: CreateProfissionalDto): Promise<Profissional> {
        return this.profissionalService.create(createProfessionalDto);
    }

    @Get()
    findAll(): Promise<Profissional[]> {
        return this.profissionalService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Profissional> {
        return this.profissionalService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.profissionalService.remove(id);
    }
}
