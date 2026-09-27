import { config as loadDotenv } from "dotenv";
loadDotenv();

import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().url(),
  PRISMA_LOG: z.enum(["query", "off"]).default("off"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Помилка валідації змінних середовища:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
