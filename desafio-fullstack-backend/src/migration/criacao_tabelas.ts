import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

export class PostRefactoringTIMESTAMP implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tipo_profissional",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "descricao",
                    type: "varchar",
                },
                {
                    name: "situacao",
                    type: "boolean",
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: 'now()'
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                }
            ]
        }), true)

        await queryRunner.createIndex("tipo_profissional", new TableIndex({
            name: "IDX_TIPO_PROFISSIONAL_DESCRICAO",
            columnNames: ["descricao"]
        }));

        await queryRunner.createTable(new Table({
            name: "profissional",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "nome",
                    type: "varchar",
                },
                {
                    name: "telefone",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "situacao",
                    type: "varchar",
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()'
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                }
            ]
        }), true);

        await queryRunner.createIndex("profissional", new TableIndex({
            name: "IDX_PROFISSIONAL_NOME",
            columnNames: ["descricao"]
        }));

        await queryRunner.createTable(new Table({
            name: "profissional_tipo_relacao",
            columns: [
                {
                    name: "profissional_id",
                    type: "int"
                },
                {
                    name: "tipo_profissional_id",
                    type: "int"
                },
            ]
        }));

        await queryRunner.createForeignKey("profissional_tipo_relacao", new TableForeignKey({
            columnNames: ["profissional_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "profissional",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("profissional_tipo_relacao", new TableForeignKey({
            columnNames: ["tipo_profissional_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "tipo_profissional",
            onDelete: "CASCADE"
        }));
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        const tableprofissional_tipo_relacao = await queryRunner.getTable("profissional_tipo_relacao");
        const foreignKeyProfissionalId = tableprofissional_tipo_relacao.foreignKeys.find(fk => fk.columnNames.indexOf("profissionalId") !== -1);
        const foreignKeyTipoProfissionalId = tableprofissional_tipo_relacao.foreignKeys.find(fk => fk.columnNames.indexOf("tipoProfissionalId") !== -1);
        await queryRunner.dropForeignKey("profissional_tipo_relacao", foreignKeyProfissionalId);
        await queryRunner.dropForeignKey("profissional_tipo_relacao", foreignKeyTipoProfissionalId);
        await queryRunner.dropTable("profissional_tipo_relacao");
        await queryRunner.dropIndex("tipo_profissional", "IDX_TIPO_PROFISSIONAL_DESCRICAO");
        await queryRunner.dropIndex("profissional", "IDX_PROFISSIONAL_NOME");
        await queryRunner.dropColumn("profissional", "profissionalId");
        await queryRunner.dropColumn("tipo_profissional", "tipoProfissionalId");
        await queryRunner.dropTable("profissional");
        await queryRunner.dropTable("tipo_profissional");
    }
}