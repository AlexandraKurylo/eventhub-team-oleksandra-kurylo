import type { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Catch } from "@nestjs/common";
import type { Request, Response } from "express";
import { toProblem } from "./problem";
import { Logger } from "@nestjs/common";

@Catch()
export class ProblemFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProblemFilter.name);

  catch(err: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const problem = toProblem(err);

    if (problem.status >= 500) {
      this.logger.error(`Unhandled error at ${req.url}:`, err);
    } else {
      this.logger.debug(`Request rejected at ${req.url} with status ${problem.status}`);
    }

    res
      .status(problem.status)
      .type("application/problem+json")
      .json({ ...problem, instance: req.originalUrl });
  }
}
