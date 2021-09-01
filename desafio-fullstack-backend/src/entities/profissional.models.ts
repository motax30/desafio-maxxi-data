import { TipoProfissional } from './tipo_profissional,model';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn, JoinTable } from "typeorm"

@Entity()
export class Profissional {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nome: string;
    @Column()
    telefone: string;
    @Column()
    email: string;
    
    @ManyToMany(()=> Profissional)
    @JoinTable({name:'profissional_tipo_relacao'})
    tipoProfissional: TipoProfissional[]
    
    @Column()
    situacao: boolean;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}