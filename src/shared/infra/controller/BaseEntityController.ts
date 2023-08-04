import {
  CacheInterceptor,
  CacheTTL,
  DefaultValuePipe,
  Get,
  Inject,
  Injectable,
  Param,
  ParseIntPipe,
  Query,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { Public } from "nest-keycloak-connect";
import { Response } from "express";
import { BaseController } from "./BaseController";
import { BaseRepository } from "src/shared/core/Base.repository";
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";
import { HttpCacheInterceptor } from "src/shared/core/interceptors/HttpCacheInterceptor";
import {
  FindBaseResponseDTO,
  InvalidCredentialsResponseDTO,
  PaginateResponseDTO,
  UnexpecteErrorDTO,
} from "./dtos/BaseDTO";

@Injectable()
export abstract class BaseEntityController extends BaseController {
  constructor(
    @Inject(BaseRepository)
    private baseRepo: BaseRepository
  ) {
    super();
  }

  @Get("paginate")
  @UseInterceptors(HttpCacheInterceptor)
  @CacheTTL(300)
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiOperation({
    summary: "Paginate",
    description: "Get paginated itens",
  })
  @ApiResponse({
    status: 200,
    description: "Created entity",
    type: PaginateResponseDTO,
  })
  @ApiResponse({
    status: 403,
    description: "Invalid user credentials",
    type: InvalidCredentialsResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: "Invalid user credentials",
    type: UnexpecteErrorDTO,
  })
  @ApiQuery({ name: "page", description: "desired page", required: false })
  @ApiQuery({
    name: "limit",
    description: "amount of itens per page",
    required: false,
  })
  @ApiQuery({
    name: "relations",
    description: "prisma relation query",
    required: false,
  })
  @ApiQuery({
    name: "include",
    description: "prisma include query",
    required: false,
  })
  async paginated(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query("relations", new DefaultValuePipe({})) relations: string,
    @Query("include", new DefaultValuePipe({})) include: string
  ) {
    console.log("SEM CACHE!");
    const isEmpty = relations && relations.length > 0;
    const isEmptyInclude = include && include.length > 0;

    const where = isEmpty ? JSON.parse(relations) : {};
    const includeRelation = isEmptyInclude ? JSON.parse(include) : {};

    const result = await this.baseRepo.paginate({
      ...where,
      ...includeRelation,
      options: { page, limit },
    });

    return result;
  }

  @Get("/:id")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiOperation({
    summary: "Find by Id",
    description: "Find by entity Id",
  })
  @ApiResponse({
    status: 200,
    type: FindBaseResponseDTO,
  })
  @ApiResponse({
    status: 403,
    description: "Invalid user credentials",
    type: InvalidCredentialsResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: "Invalid user credentials",
    type: UnexpecteErrorDTO,
  })
  @ApiParam({ name: "id", type: String, description: "entity id" })
  async findById2(@Res() res: Response, @Param() params: any) {
    if (!params.id) return this.ok(res, {});
    this.baseRepo
      .findOne({
        where: {
          id: params.id,
        },
      })
      .then((result) => {
        this.ok(res, result || {});
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }

  @Get("")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiOperation({
    summary: "Find all",
    description: "Find all by relation query",
  })
  @ApiResponse({
    status: 200,
    type: [FindBaseResponseDTO],
  })
  @ApiResponse({
    status: 403,
    description: "Invalid user credentials",
    type: InvalidCredentialsResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: "Invalid user credentials",
    type: UnexpecteErrorDTO,
  })
  @ApiQuery({
    name: "relations",
    description: "prisma relation query",
    required: false,
  })
  async findAll(
    @Res() res: Response,
    @Query("relations", new DefaultValuePipe({})) relations: string
  ) {
    const isEmpty = relations && relations.length > 0;
    const where = isEmpty ? JSON.parse(relations) : {};
    this.baseRepo
      .findAll({ ...where })
      .then((result) => {
        this.ok(res, result || {});
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }
}
