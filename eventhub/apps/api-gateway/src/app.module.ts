import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { CatalogModule } from "./catalog/catalog.module";

/**
 * Кореневий модуль застосунку.
 */
@Module({
  imports: [HealthModule, CatalogModule],
})
export class AppModule {}
