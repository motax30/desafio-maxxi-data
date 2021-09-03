
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoProfissionalDto } from '../dto/create_tipo_profissional.dto';
import { TipoProfissional } from '../entity/tipo_profissional.entity';

@Injectable()
export class TipoProfissionalsService {
    constructor(
        @InjectRepository(TipoProfissional)
        private readonly tipoProfissionalsRepository: Repository<TipoProfissional>,
      ) {}

      create(createProfessionalDto: CreateTipoProfissionalDto): Promise<TipoProfissional> {
        const tipoProfissional = new TipoProfissional();
        tipoProfissional.descricao = createProfessionalDto.descricao;
        tipoProfissional.situacao = createProfessionalDto.situacao;
    
        return this.tipoProfissionalsRepository.save(tipoProfissional);
      }
    
      async findAll(): Promise<TipoProfissional[]> {
        return this.tipoProfissionalsRepository.find();
      }
    
      findOne(id: string): Promise<TipoProfissional> {
        return this.tipoProfissionalsRepository.findOne(id);
      }
    
      async remove(id: string): Promise<void> {
        await this.tipoProfissionalsRepository.delete(id);
      }
}
