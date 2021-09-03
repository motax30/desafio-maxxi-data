import { Test, TestingModule } from '@nestjs/testing';
import { Profissional } from '../entity/profissional.entity';
import { ProfissionalController } from './profissionals.controller';
import { ProfissionalsService } from './profissionals.service';
import { CreateProfissionalDto } from './dto/create-profissionaldto.ts';
import { TipoProfissional } from '../entity/tipo_profissional.entity';

const newProfissional: Profissional = new Profissional({
  nome : 'Adriano', telefone : '123456789', email : 'teste@test.com.br', situacao: true, tipoProfissional:[]})

const profissionalList: Profissional[] = [
  new Profissional({nome : 'Adriano Mota e Souza', telefone : '123456789', email : 'teste@test.com.br'}),
  new Profissional({nome : 'Henrique Constantino', telefone : '456789', email : 'henrique@test.com.br'}),
  new Profissional({nome : 'Maria das Dores Souza', telefone : '789456123', email : 'maria@test.com.br'})
]

const tipoProfissional: TipoProfissional = new TipoProfissional({
  descricao : 'Chefe da Seção de Testes', situacao : true})

describe('ProfissionalController', ()=> {
    let profissionalController: ProfissionalController;
    let profissionalService: ProfissionalsService;

   beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [ProfissionalController],
        providers: [{
          provide: ProfissionalsService,
          useValue: {
            create: jest.fn().mockResolvedValue(newProfissional),
            findAll: jest.fn().mockResolvedValue(profissionalList),
            findOne: jest.fn().mockResolvedValue(profissionalList[0]),
            remove: jest.fn().mockResolvedValue(profissionalList[0])
          }
        }],
      }).compile();

    profissionalService = moduleRef.get<ProfissionalsService>(ProfissionalsService);
    profissionalController = moduleRef.get<ProfissionalController>(ProfissionalController);
  });

  describe('create', ()=> {
    it('should create a new Profissional sucessfully', async () => {
      //Arrange
      const body: CreateProfissionalDto = {
        nome: 'Adriano',
        telefone: '123456789',
        email: 'teste@test.com.br',
        situacao: true,
        tipoProfissional: []
      }
      //Act
      const result = await profissionalController.create(body);
      // Assert
      expect(result).toEqual(newProfissional);
     
    });

    it('should throw an exception', ()=>{
      //Arrange
      const body: CreateProfissionalDto = {
        nome: 'Adriano',
        telefone: '123456789',
        email: 'teste@test.com.br',
        situacao: true,
        tipoProfissional: []
      }

      jest.spyOn(profissionalService, 'create').mockRejectedValueOnce(new Error());

      //Assert
      expect(profissionalController.create(body)).rejects.toThrowError();
    })
  })

  describe('findAll', () => {
    it('should return an array of profissionals', async () => {
      const result: Profissional[] = [profissionalList[0]];
      jest.spyOn(profissionalService, 'findAll').mockImplementation(async () => result);

      expect(await profissionalController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should get a profissional item sucessfully', async () => {
      //Act
      const result = await profissionalController.findOne('1');
      // Assert
      expect(result).toEqual(profissionalList[0]);
      expect(profissionalService.findOne).toHaveBeenCalledTimes(1);
      expect(profissionalService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(profissionalService, 'findOne').mockRejectedValueOnce(new Error())

      // Assert
      expect(profissionalController.findOne('1')).rejects.toThrowError();
    })
  })

  describe('remove', ()=> {
    it('should remove a profissional item sucessfully', async () => {
      //Act
      const result = await profissionalController.remove('1');
      //Assert
      expect(result).toEqual(profissionalList[0]);
    });

    it('should throw an exception', ()=>{
      //Arrange
      jest.spyOn(profissionalService, 'remove').mockRejectedValueOnce(new Error())
    })
  })
})