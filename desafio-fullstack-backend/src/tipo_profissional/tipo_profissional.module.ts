import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProfissional } from '../entity/tipo_profissional.entity';
import { TipoProfissionalController } from './tipo_profissionals.controller';
import { TipoProfissionalsService } from './tipo_profissionals.service';

@Module({
    imports: [TypeOrmModule.forFeature([TipoProfissional])],
    providers: [TipoProfissionalsService],
    controllers: [TipoProfissionalController],
    exports: [TypeOrmModule]
})
export class TipoProfissionalModule {
    
}
