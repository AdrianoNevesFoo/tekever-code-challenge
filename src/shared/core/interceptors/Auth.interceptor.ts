import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly cls: ClsService,
    private readonly jwtService: JwtService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Extract the client's ip address from the request...

    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;

    const userIp = request.connection.remoteAddress;
    const [, token] = authorization
      ? request.headers.authorization.split(" ")
      : ["", ""];

    this.cls.set("ip", userIp);
    this.cls.set("token", token);

    const tokenDecoded = this.jwtService.decode(token);
    if (tokenDecoded) {
      this.cls.set("email", tokenDecoded["email"]);
    }

    return next.handle();
  }
}
