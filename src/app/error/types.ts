import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends HTTPException {
  code: string;
  details?: Record<string, unknown>;

  constructor(
    status: ContentfulStatusCode = 500,
    code: string = "INTERNAL_ERROR",
    message: string = "An error occurred",
    details?: Record<string, unknown>
  ) {
    super(status, { message });
    this.code = code;
    this.details = details;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found", details?: Record<string, unknown>) {
    super(404, "NOT_FOUND", message, details);
  }
}

export class ValidationError extends AppError {
  constructor(
    message = "Validation failed",
    details?: Record<string, unknown>
  ) {
    super(400, "VALIDATION_ERROR", message, details);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", details?: Record<string, unknown>) {
    super(400, "BAD_REQUEST", message, details);
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database error", details?: Record<string, unknown>) {
    super(500, "DATABASE_ERROR", message, details);
  }
}
