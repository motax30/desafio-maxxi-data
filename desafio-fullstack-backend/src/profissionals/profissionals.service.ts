import { Profissional } from '../entity/profissional.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfissionalDto } from './dto/create-profissionaldto.ts';

@Injectable()
export class ProfissionalsService {
    constructor(
        @InjectRepository(Profissional)
        private readonly profissionalsRepository: Repository<Profissional>,
      ) {}

      create(createProfessionalDto: CreateProfissionalDto): Promise<Profissional> {
        const profissional = new Profissional();
        profissional.nome = createProfessionalDto.nome;
        profissional.telefone = createProfessionalDto.telefone;
        profissional.email = createProfessionalDto.email
        profissional.tipoProfissional = createProfessionalDto.tipoProfissional
        profissional.situacao = createProfessionalDto.situacao
    
        return this.profissionalsRepository.save(profissional);
      }
    
      async findAll(): Promise<Profissional[]> {
        return this.profissionalsRepository.find();
      }
    
      findOne(id: string): Promise<Profissional> {
        return this.profissionalsRepository.findOne(id);
      }
    
      async remove(id: string): Promise<void> {
        await this.profissionalsRepository.delete(id);
      }
}
