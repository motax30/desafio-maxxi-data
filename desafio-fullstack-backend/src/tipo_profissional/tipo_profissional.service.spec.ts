import { TipoProfissionalsService } from './tipo_profissionals.service';
import { TipoProfissional } from '../entity/tipo_profissional.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTipoProfissionalDto } from '../dto/create_tipo_profissional.dto';
import { NotFoundException } from '@nestjs/common';

const newTipoProfissional: TipoProfissional = new TipoProfissional({descricao:'Chefe da Seção de Testes', situacao: true});
const tipoProfissionalList: TipoProfissional[] = [
    new TipoProfissional({descricao:'Chefe da Seção de Testes', situacao: true}),
    new TipoProfissional({descricao:'Chefe da Seção de Implementação', situacao: true}),
    new TipoProfissional({descricao:'Chefe da Seção de Administração', situacao: true})
]

describe('TipoProfissionalService', () => {
    let tipoProfissionalService: TipoProfissionalsService;
    let tipoProfissionalRepository: Repository<TipoProfissional>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TipoProfissionalsService,
          {
            provide: getRepositoryToken(TipoProfissional),
            useValue: {
              find: jest.fn().mockResolvedValue(tipoProfissionalList),
              findOne: jest.fn().mockResolvedValue(tipoProfissionalList[0]),
              save: jest.fn().mockReturnValue(newTipoProfissional),
              delete: jest.fn().mockReturnValue(undefined)
            },
          },
        ],
      }).compile();
  
      tipoProfissionalService = module.get<TipoProfissionalsService>(TipoProfissionalsService);
      tipoProfissionalRepository = module.get<Repository<TipoProfissional>>(
        getRepositoryToken(TipoProfissional),
      );
    });
  
    it('should be defined', () => {
      expect(tipoProfissionalService).toBeDefined();
      expect(tipoProfissionalRepository).toBeDefined();
    });

    describe('create', () => {
      it('should create a new TipoProfissional item successfully', async () => {
          //Arrange
          const body: CreateTipoProfissionalDto= {
            descricao: 'Adriano',
            situacao: true
          }
          //Act
          const result = await tipoProfissionalService.create(body);
          // Assert
          expect(result).toEqual(newTipoProfissional);
          expect(tipoProfissionalRepository.save).toHaveBeenCalledTimes(1);
          expect(tipoProfissionalRepository.save).toHaveBeenCalledWith(body);
      });
  
      it('should throw an exception', () => {
        //Arrange
        const body: CreateTipoProfissionalDto= {
          descricao: 'Adriano',
          situacao: true
        }
  
        jest.spyOn(tipoProfissionalRepository, 'save').mockRejectedValueOnce(new Error());
  
        // Assert
        expect(tipoProfissionalService.create(body)).rejects.toThrowError();
      });
    });

  describe('findAll', () => {
    it('should return a TipoProfissional list successfully', async () => {
      // Act
      const result = await tipoProfissionalService.findAll();

      // Assert
      expect(result).toEqual(tipoProfissionalList);
      expect(tipoProfissionalRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(tipoProfissionalRepository, 'find').mockRejectedValueOnce(new Error());

      // Assert
      expect(tipoProfissionalService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a TipoProfissional item successfully', async () => {
      // Act
      const result = await tipoProfissionalService.findOne('1');

      // Assert
      expect(result).toEqual(tipoProfissionalList[0]);
      expect(tipoProfissionalRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a TipoProfissional item successfully', async () => {
      // Act
      const result = await tipoProfissionalService.remove('1');

      // Assert
      expect(result).toBeUndefined();
      expect(tipoProfissionalRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(tipoProfissionalRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(tipoProfissionalService.remove('1')).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(tipoProfissionalRepository, 'delete')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(tipoProfissionalService.remove('1')).rejects.toThrowError();
    });
  });
});