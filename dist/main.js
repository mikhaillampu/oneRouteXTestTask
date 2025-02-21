"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
(0, dotenv_1.config)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('OneRouteX test API')
        .setDescription('This API is implementation of the test task for hiring (or not) Michael Lampu')
        .setVersion('1.0')
        .addBearerAuth({
        description: 'Bearer <TOKEN>',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        type: 'http',
    }, 'access-token')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/doc', app, swaggerDocument, {
        swaggerOptions: {
            docExpansion: 'none',
            schemaExpansion: 'none',
            defaultModelsExpandDepth: 0,
            defaultModelExpandDepth: 0,
            defaultModelRendering: 'example',
            displayRequestDuration: true,
            filter: true,
            tagsSorter: 'alpha',
            syntaxHighlight: true,
            'syntaxHighlight.theme': 'idea',
            tryItOutEnabled: true,
            persistAuthorization: true
        }
    });
    await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map