import { Test, TestingModule } from '@nestjs/testing';
import { TipoProfissionalController } from './tipo_profissionals.controller';
import { TipoProfissionalsService } from './tipo_profissionals.service';
import { TipoProfissional } from '../entity/tipo_profissional.entity';
import { CreateTipoProfissionalDto } from '../dto/create_tipo_profissional.dto';

const newTipoProfissional: TipoProfissional = new TipoProfissional({descricao:'Chefe da Seção de Testes', situacao: true});
const tipoProfissionalList: TipoProfissional[] = [
    new TipoProfissional({descricao:'Chefe da Seção de Testes', situacao: true}),
    new TipoProfissional({descricao:'Chefe da Seção de Implementação', situacao: true}),
    new TipoProfissional({descricao:'Chefe da Seção de Administração', situacao: true})
]

describe('Tipo_profissional', () => {
    let tipoProfissionalController: TipoProfissionalController;
    let tipoProfissionalService: TipoProfissionalsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TipoProfissionalController],
            providers: [
                {
                    provide: TipoProfissionalsService,
                    useValue: {
                        create: jest.fn().mockReturnValue(newTipoProfissional),
                        findAll: jest.fn().mockResolvedValue(tipoProfissionalList),
                        findOne: jest.fn().mockResolvedValue(tipoProfissionalList[0]),
                        remove: jest.fn().mockResolvedValue(tipoProfissionalList[0])
                    }
                }
            ]
        }).compile();

        tipoProfissionalController = module.get<TipoProfissionalController>(TipoProfissionalController);
        tipoProfissionalService = module.get<TipoProfissionalsService>(TipoProfissionalsService)
    });

    it('should be defined', () => {
        expect(tipoProfissionalController).toBeDefined();
        expect(tipoProfissionalService).toBeDefined();
    })

    describe('create', ()=> {
        it('should create a new TipoProfissional', async () => {
            //Arrange
        const body: CreateTipoProfissionalDto= {
            descricao: 'Adriano',
            situacao: true
        }
        //Act
        const result = await tipoProfissionalController.create(body);
        // Assert
        expect(result).toEqual(newTipoProfissional);
        });

        it('should throw an exception', ()=>{
        //Arrange
        const body: CreateTipoProfissionalDto= {
            descricao: 'Adriano',
            situacao: true
        }

        jest.spyOn(tipoProfissionalController, 'create').mockRejectedValueOnce(new Error());

        //Assert
        expect(tipoProfissionalController.create(body)).rejects.toThrowError();
        })
    });

    describe('findAll', () => {
        it('should return an array of profissionals', async () => {
          const result: TipoProfissional[] = [tipoProfissionalList[0]];
          jest.spyOn(tipoProfissionalService, 'findAll').mockImplementation(async () => result);
    
          expect(await tipoProfissionalController.findAll()).toBe(result);
        });
      });
    
      describe('findOne', () => {
        it('should get a profissional item sucessfully', async () => {
          //Act
          const result = await tipoProfissionalController.findOne('1');
          // Assert
          expect(result).toEqual(tipoProfissionalList[0]);
          expect(tipoProfissionalService.findOne).toHaveBeenCalledTimes(1);
          expect(tipoProfissionalService.findOne).toHaveBeenCalledWith('1');
        });
    
        it('should throw an exception', () => {
          //Arrange
          jest.spyOn(tipoProfissionalService, 'findOne').mockRejectedValueOnce(new Error())
    
          // Assert
          expect(tipoProfissionalController.findOne('1')).rejects.toThrowError();
        })
      })
    
      describe('remove', ()=> {
        it('should remove a profissional item sucessfully', async () => {
          //Act
          const result = await tipoProfissionalController.remove('1');
          //Assert
          expect(result).toEqual(tipoProfissionalList[0]);
        });
    
        it('should throw an exception', ()=>{
          //Arrange
          jest.spyOn(tipoProfissionalService, 'remove').mockRejectedValueOnce(new Error())
        })
      })
});