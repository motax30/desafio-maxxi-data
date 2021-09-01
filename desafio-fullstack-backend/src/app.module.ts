import { TipoProfissional } from './entities/tipo_profissional,model';
import { Profissional } from './entities/profissional.models';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfissionalModule } from './profissional/profissional.module';
import { ProfissionalHttpModule } from './profissional/profissional-http.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      url: 'postgres://desafio:desafio@localhost/desafio',
      entities: ["entities/*.ts"],
      migrationsTableName: "custom_migration_table",
      migrations: ["migration/*.ts"],
      cli: {
        "migrationsDir": "migration"
      },
      synchronize: true,
      logging: ["query", "error"]
    }),
    ProfissionalModule,
    ProfissionalHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
