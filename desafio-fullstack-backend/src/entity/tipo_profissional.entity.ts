import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm"

@Entity()
export class TipoProfissional {

    constructor(tipoProfissional?: Partial<TipoProfissional>){
        this.descricao = tipoProfissional?.descricao;
        this.situacao = tipoProfissional?.situacao;
    }

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    descricao: string;
   
    @Column()
    situacao:boolean;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt:Date;

}
