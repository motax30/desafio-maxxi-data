import { ProfissionalController } from './profissional.controller';
import { ProfissionalService } from './profissional.service';
import { ProfissionalModule } from './profissional.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [ProfissionalModule],
    providers: [ProfissionalService],
    controllers: [ProfissionalController]
  })
export class ProfissionalHttpModule {}
