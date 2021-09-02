import { TipoProfissional } from "src/entity/tipo_profissional.entity";

export class CreateProfissionalDto {
    nome: string;
    telefone: string;
    email: string;
    tipoProfissional: TipoProfissional[]
    situacao: boolean;
}
