import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfissionalModule } from './profissionals/profissional.module';
import { TipoProfissionalModule } from './tipo_profissional/tipo_profissional.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      url: 'postgres://desafio:desafio@localhost/desafio',
      entities: ['./entity/*.ts'],
      migrationsTableName: "custom_migration_table",
      migrations: ["./migration/*.ts"],
      cli: {
        "migrationsDir": "migration"
      },
      synchronize: true,
      logging: ["query", "error"],
      autoLoadEntities: true
    }),
    TipoProfissionalModule,
    ProfissionalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
