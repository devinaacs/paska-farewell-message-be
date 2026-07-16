"use strict";

const { NestFactory } = require("@nestjs/core");
const { ValidationPipe, RequestMethod } = require("@nestjs/common");
const helmet = require("helmet");
const { randomUUID } = require("node:crypto");

let cachedHandler = null;

async function initApp() {
  const { AppModule } = require("../dist/app.module");
  const { ApiResponseInterceptor } = require("../dist/common/interceptors/api-response.interceptor");
  const { HttpExceptionFilter } = require("../dist/common/filters/http-exception.filter");

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ["error", "warn", "log"],
  });

  app.use(helmet());
  app.use((req, res, next) => {
    req.requestId =
      req.header("x-request-id") ??
      req.header("x-correlation-id") ??
      randomUUID();
    res.setHeader("x-request-id", req.requestId);
    next();
  });
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? "*",
    credentials: true,
  });
  app.setGlobalPrefix(process.env.API_PREFIX ?? "api/v1", {
    exclude: [{ path: "/", method: RequestMethod.GET }],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  await app.init();
  return app.getHttpAdapter().getInstance();
}

module.exports = async (req, res) => {
  if (!cachedHandler) {
    cachedHandler = await initApp();
  }
  return cachedHandler(req, res);
};
