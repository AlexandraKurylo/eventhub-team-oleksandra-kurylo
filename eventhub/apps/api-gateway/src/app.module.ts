import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { LoggerModule } from "nestjs-pino";
import { randomUUID } from "node:crypto";
import { HealthModule } from "./health/health.module";
import { CatalogModule } from "./catalog/catalog.module";
import { OrdersModule } from "./orders/orders.module";
import { ProblemFilter } from "./common/problem/problem.filter";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? "info",
        genReqId: (req, res) => {
          const incoming = req.headers["x-request-id"];
          const id = typeof incoming === "string" && incoming ? incoming : randomUUID();
          res.setHeader("x-request-id", id);
          return id;
        },
        redact: ["req.headers.authorization", "req.headers.cookie", "res.headers['set-cookie']"],
        transport:
          process.env.NODE_ENV !== "production"
            ? { target: "pino-pretty", options: { singleLine: true } }
            : undefined,
      },
    }),
    PrismaModule,
    HealthModule,
    CatalogModule,
    OrdersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ProblemFilter,
    },
  ],
})
export class AppModule {}
