import { CacheInterceptor, ExecutionContext, Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  constructor(
    cacheManager: any,
    reflector: any,
    private readonly clsService: ClsService
  ) {
    super(cacheManager, reflector);
  }

  trackBy(context: ExecutionContext): string | undefined {
    const token = this.clsService.get("token");
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;

    const isGetRequest = httpAdapter.getRequestMethod(request) === "GET";
    const excludePaths: string[] = [];

    const requestUrl: string = httpAdapter.getRequestUrl(request);

    if (!isGetRequest || (isGetRequest && excludePaths.includes(requestUrl))) {
      return undefined;
    }
    return requestUrl.concat(token);
  }
}
