import { Profissional } from './../entities/profissional.models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfissionalService {
    constructor(
        @InjectRepository(Profissional)
        private usersRepository: Repository<Profissional>,
      ) {}
    
      findAll(): Promise<Profissional[]> {
        return this.usersRepository.find();
      }
    
      findOne(id: string): Promise<Profissional> {
        return this.usersRepository.findOne(id);
      }
    
      async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
      }
}
