import { Catch, ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { HttpAdapterHost } from "@nestjs/core";
import { EventEmitter2 } from "@nestjs/event-emitter";
import AppError from "../errors/AppError";
import { SummaryError } from "../errors/SummaryError.domain";

interface ResponseBody {
  status: number;
  timestamp: string;
  path: string;
  errors: string[];
  friendlyMessage: string;
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly emitter: EventEmitter2
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const headers = ctx.getResponse().req.headers;

    const responseBody = {
      status: 500,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      errors: [],
      friendlyMessage: "",
    } as ResponseBody;

    if (exception instanceof AppError) {
      responseBody.errors = exception.errors;
      responseBody.status = exception.status;
      responseBody.friendlyMessage = exception.friendlyMessage;
    } else {
      responseBody.errors = this.buildDefaultErros(exception);
      responseBody.status = exception?.status || 500;
      responseBody.friendlyMessage = this.getFriendlyMessage(
        responseBody.status
      );
    }

    const event = this?.emitter?.emit("exception.attempt", {
      exception: responseBody,
      headers,
      request: this.getRequest(ctx),
    });

    this.printError(exception);
    httpAdapter.reply(
      ctx.getResponse(),
      { ...responseBody },
      responseBody.status || 500
    );
  }

  getFriendlyMessage(status: number) {
    if (status == 401 || status == 403) {
      return "Unauthorized user. This resource is only available to authorized users!";
    }
    return "Oops, an unexpected error occurred! Try again later.";
  }

  buildDefaultErros(exception) {
    if (exception?.response) {
      return [
        JSON.stringify({
          error: exception.response.error,
          message: exception.response.message,
          statusCode: exception.response.statusCode,
        }),
      ];
    } else {
      return exception.message ? [exception.message] : [];
    }
  }

  printError(err: any) {
    try {
      const summary = new SummaryError(err);
      console.log("\n");
      console.log("------------------------ERRO------------------------");
      summary.print();
      console.log("------------------------ERRO------------------------");
      console.log("\n");
    } catch (err) {
      console.error("Não foi possível imprimir a stack de erro!");
    }
  }

  private getRequest(ctx: HttpArgumentsHost) {
    const req = ctx.getRequest();
    return {
      body: req?.body,
      headers: req?.headers,
      host: req?.host,
      params: req?.params,
      ip: req?.ip,
      query: req?.query,
    };
  }
}
