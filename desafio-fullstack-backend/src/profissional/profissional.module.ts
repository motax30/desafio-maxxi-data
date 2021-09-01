import { ProfissionalController } from './profissional.controller';
import { Profissional } from './../entities/profissional.models';
import { ProfissionalService } from './profissional.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Profissional])],
    providers: [ProfissionalService],
    controllers: [ProfissionalController],
    exports: [TypeOrmModule]
})
export class ProfissionalModule {
    
}
