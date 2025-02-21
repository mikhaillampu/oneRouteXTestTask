"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const pg_1 = require("pg");
const task_entity_1 = require("./entity/task.entity");
const constant_1 = require("./constant");
const task_module_1 = require("./task/task.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const user_entity_1 = require("./entity/user.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => {
                    const { env: { DB_USER: user, DB_PASS: password, DB_PORT: port, DB_HOST: host, DB_NAME: database } } = process;
                    let client = new pg_1.Client({ user, host, password });
                    try {
                        await client.connect();
                    }
                    catch (e) {
                        console.error(`${constant_1.Const.err.DB_UNAVAILABLE} ${host}:${port}`);
                        process.exit(`${constant_1.Const.err.DB_UNAVAILABLE} ${host}:${port}`);
                    }
                    ;
                    try {
                        console.log(constant_1.Const.CREATING_DATABASE);
                        await client.query(`${constant_1.Const.sql.CREATE_DB} ${database};`);
                        console.log(`${constant_1.Const.DB_CREATED} (${database})`);
                    }
                    catch (e) {
                        console.error(`${constant_1.Const.err.DB_EXISTS} (${database})`);
                    }
                    ;
                    client = null;
                    return {
                        type: 'postgres',
                        host,
                        port: +(port || 5432),
                        username: user,
                        password,
                        database,
                        entities: [task_entity_1.Task, user_entity_1.User],
                        synchronize: true,
                        autoLoadEntities: true
                    };
                },
            }),
            task_module_1.TaskModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map