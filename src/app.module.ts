import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from 'pg';
import { Task } from './entity/task.entity';
import { Const } from './constant';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entity/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        const { env: {
          DB_USER: user,
          DB_PASS: password,
          DB_PORT: port,
          DB_HOST: host,
          DB_NAME: database }
        } = process;

        let client: Client | null = new Client({ user, host, password });
        try { await client.connect(); }
        catch (e) {
          console.error(`${Const.err.DB_UNAVAILABLE} ${host}:${port}`);
          process.exit(`${Const.err.DB_UNAVAILABLE} ${host}:${port}`);
        };

        try {
          console.log(Const.CREATING_DATABASE);
          await client.query(`${Const.sql.CREATE_DB} ${database};`);
          console.log(`${Const.DB_CREATED} (${database})`);
        } catch (e) {
          console.error(`${Const.err.DB_EXISTS} (${database})`);
        };

        client = null;

        return {
          type: 'postgres',
          host,
          port: +(port || 5432),
          username: user,
          password,
          database,
          entities: [Task, User],
          synchronize: true,
          autoLoadEntities: true
        };
      },
    }),
    TaskModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
