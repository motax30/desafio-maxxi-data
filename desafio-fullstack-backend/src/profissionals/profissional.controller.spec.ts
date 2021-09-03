import { ProfissionalController } from './profissionals.controller';
import { ProfissionalsService } from './profissionals.service';
import { Profissional } from '../entity/profissional.entity';
import { Test } from '@nestjs/testing';

describe(ProfissionalController, ()=> {
    let profissionalController: ProfissionalController;
    let profissionalService: ProfissionalsService;

   beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ProfissionalController],
        providers: [ProfissionalsService],
      }).compile();

    profissionalService = moduleRef.get<ProfissionalsService>(ProfissionalsService);
    profissionalController = moduleRef.get<ProfissionalController>(ProfissionalController);
  });

  describe('findAll', () => {
    it('should return an array of profissionals', async () => {
      const profissional = new Profissional();
      profissional.nome = 'Adriano Mota e Souza';
      profissional.email = 'teste@test.com.br';
      const result: Profissional[] = [profissional];
      jest.spyOn(profissionalService, 'findAll').mockImplementation(async () => result);

      expect(await profissionalController.findAll()).toBe(result);
    });
  });

})