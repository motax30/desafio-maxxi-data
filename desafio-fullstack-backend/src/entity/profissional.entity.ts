import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TipoProfissional } from "./tipo_profissional.entity";

@Entity()
export class Profissional {

    constructor(profissional?: Partial<Profissional>){
        this.id = profissional?.id;
        this.nome = profissional?.nome;
        this.telefone = profissional?.telefone;
        this.email = profissional?.email;
        this.tipoProfissional = profissional?.tipoProfissional;
        this.createdAt = profissional?.createdAt;
        this.updatedAt = profissional?.updatedAt;
    }

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nome: string;
    @Column()
    telefone: string;
    @Column()
    email: string;
    
    @ManyToMany(()=> TipoProfissional)
    @JoinTable({name:'profissional_tipo_relacao'})
    tipoProfissional: TipoProfissional[]
    
    @Column()
    situacao: boolean;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}