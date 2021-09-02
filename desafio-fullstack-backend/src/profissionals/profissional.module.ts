import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profissional } from '../entity/profissional.entity';
import { ProfissionalController } from './profissionals.controller';
import { ProfissionalsService } from './profissionals.service';

@Module({
    imports: [TypeOrmModule.forFeature([Profissional])],
    providers: [ProfissionalsService],
    controllers: [ProfissionalController],
    exports: [TypeOrmModule]
})
export class ProfissionalModule {
    
}
