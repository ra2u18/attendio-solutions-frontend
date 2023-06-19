export class CustomError extends Error {
  status: number;
  ctx: Record<string, unknown> | undefined;

  constructor(message: string, status: number, ctx?: Record<string, unknown> | undefined) {
    super(message);
    this.name = this.constructor.name;

    // Clips the stack trace to this constructor
    Error.captureStackTrace(this, this.constructor);

    // Custom props
    this.status = status;
    this.ctx = ctx;
  }

  toString(): string {
    let str = `${this.name}: ${this.message}`;
    if (this.ctx) str += `\nContext: ${JSON.stringify(this.ctx)}`;

    return str;
  }
}

export type CustomErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};
