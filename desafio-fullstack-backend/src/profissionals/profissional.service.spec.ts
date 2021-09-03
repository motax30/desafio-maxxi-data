import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profissional } from '../entity/profissional.entity';
import { ProfissionalsService } from './profissionals.service';
import { CreateProfissionalDto } from '../dto/create-profissionaldto.ts';
import { NotFoundException } from '@nestjs/common';

const newProfissional: Profissional = new Profissional({
    nome : 'Adriano', telefone : '123456789', email : 'teste@test.com.br', situacao: true, tipoProfissional:[]})
  
const profissionalList: Profissional[] = [
new Profissional({nome : 'Adriano Mota e Souza', telefone : '123456789', email : 'teste@test.com.br'}),
new Profissional({nome : 'Henrique Constantino', telefone : '456789', email : 'henrique@test.com.br'}),
new Profissional({nome : 'Maria das Dores Souza', telefone : '789456123', email : 'maria@test.com.br'})
]

describe('ProfissionalService', () => {
    let profissionalService: ProfissionalsService;
    let profissionalRepository: Repository<Profissional>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ProfissionalsService,
          {
            provide: getRepositoryToken(Profissional),
            useValue: {
                find: jest.fn().mockResolvedValue(profissionalList),
                findOne: jest.fn().mockResolvedValue(profissionalList[0]),
                save: jest.fn().mockReturnValue(newProfissional),
                delete: jest.fn().mockReturnValue(undefined)
            },
          },
        ],
      }).compile();
  
      profissionalService = module.get<ProfissionalsService>(ProfissionalsService);
      profissionalRepository = module.get<Repository<Profissional>>(
        getRepositoryToken(Profissional),
      );
    });
  
    it('should be defined', () => {
      expect(profissionalService).toBeDefined();
      expect(profissionalRepository).toBeDefined();
    });

    describe('create', () => {
        it('should create a new Profissional item successfully', async () => {
            //Arrange
            const body: CreateProfissionalDto = {
            nome: 'Adriano',
            telefone: '123456789',
            email: 'teste@test.com.br',
            situacao: true,
            tipoProfissional: []
            }
            //Act
            const result = await profissionalService.create(body);
            // Assert
            expect(result).toEqual(newProfissional);
            expect(profissionalRepository.save).toHaveBeenCalledTimes(1);
            expect(profissionalRepository.save).toHaveBeenCalledWith(body);
        });
    
        it('should throw an exception', () => {
          //Arrange
          const body: CreateProfissionalDto = {
            nome: 'Adriano',
            telefone: '123456789',
            email: 'teste@test.com.br',
            situacao: true,
            tipoProfissional: []
            }
    
          jest.spyOn(profissionalRepository, 'save').mockRejectedValueOnce(new Error());
    
          // Assert
          expect(profissionalService.create(body)).rejects.toThrowError();
        });
      });

    describe('findAll', () => {
      it('should return a Profissional list successfully', async () => {
        // Act
        const result = await profissionalService.findAll();
  
        // Assert
        expect(result).toEqual(profissionalList);
        expect(profissionalRepository.find).toHaveBeenCalledTimes(1);
      });
  
      it('should throw an exception', () => {
        // Arrange
        jest.spyOn(profissionalRepository, 'find').mockRejectedValueOnce(new Error());
  
        // Assert
        expect(profissionalService.findAll()).rejects.toThrowError();
      });
    });

    describe('findOne', () => {
      it('should return a Profissional item successfully', async () => {
        // Act
        const result = await profissionalService.findOne('1');
  
        // Assert
        expect(result).toEqual(profissionalList[0]);
        expect(profissionalRepository.findOne).toHaveBeenCalledTimes(1);
      });
  
      it('should throw a not found exception', () => {
        // Arrange
        jest
          .spyOn(profissionalRepository, 'findOne')
          .mockRejectedValueOnce(new Error());
  
        // Assert
        expect(profissionalService.findOne('1')).rejects.toThrowError(
          NotFoundException,
        );
      });
    });

    describe('delete', () => {
      it('should delete a Profissional item successfully', async () => {
        // Act
        const result = await profissionalService.remove('1');
  
        // Assert
        expect(result).toBeUndefined();
        expect(profissionalRepository.delete).toHaveBeenCalledTimes(1);
      });
  
      it('should throw a not found exception', () => {
        // Arrange
        jest
          .spyOn(profissionalRepository, 'findOne')
          .mockRejectedValueOnce(new Error());
  
        // Assert
        expect(profissionalService.remove('1')).rejects.toThrowError(
          NotFoundException,
        );
      });
  
      it('should throw an exception', () => {
        // Arrange
        jest
          .spyOn(profissionalRepository, 'delete')
          .mockRejectedValueOnce(new Error());
  
        // Assert
        expect(profissionalService.remove('1')).rejects.toThrowError();
      });
    });
});