import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm"

@Entity()
export class TipoProfissional {
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
