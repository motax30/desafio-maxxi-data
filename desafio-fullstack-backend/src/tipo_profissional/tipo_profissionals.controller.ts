import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTipoProfissionalDto } from '../dto/create_tipo_profissional.dto';
import { TipoProfissional } from '../entity/tipo_profissional.entity';
import { TipoProfissionalsService } from './tipo_profissionals.service';


@Controller('tipo_profissionals')
export class TipoProfissionalController {
    constructor(private readonly tipoProfissionalService: TipoProfissionalsService) {}

    @Post()
    create(@Body() createTipoProfessionalDto: CreateTipoProfissionalDto): Promise<TipoProfissional> {
        return this.tipoProfissionalService.create(createTipoProfessionalDto);
    }

    @Get()
    findAll(): Promise<TipoProfissional[]> {
        return this.tipoProfissionalService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<TipoProfissional> {
        return this.tipoProfissionalService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.tipoProfissionalService.remove(id);
    }
}
