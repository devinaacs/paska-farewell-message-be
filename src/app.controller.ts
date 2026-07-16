import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  root() {
    return {
      name: "Paska Farewell Message API",
      version: "1.0.0",
      status: "ok",
      endpoints: {
        health: "/api/v1/health/ready",
        messages: "/api/v1/messages",
        docs: "/docs",
      },
    };
  }
}
