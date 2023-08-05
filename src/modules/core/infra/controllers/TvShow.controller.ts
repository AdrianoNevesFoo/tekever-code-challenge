import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthInterceptor } from "src/shared/core/interceptors/Auth.interceptor";
import { BaseEntityController } from "src/shared/infra/controller/BaseEntityController";
import { Response } from "express";
import { Public } from "nest-keycloak-connect";
import { TvShowRepository } from "../repository/impl/TvShowRepository";
import { InvalidCredentialsResponseDTO } from "src/modules/auth/infra/dtos/AccessTokenDTO";
import { UnexpecteErrorDTO } from "src/shared/infra/controller/dtos/BaseDTO";
import {
  CreateTvShowDTO,
  CreateTvShowResponseDTO,
  TvShowDetailsResponseDTO,
} from "./dtos/TvShowDTO";
import TvShowQuery from "../../application/query/TvShowQuery";
import { DeleteTvShowUseCase } from "../../application/usecases/DeleteTvShowUseCase";
import { TvShowService } from "../../application/services/Tvshow.service";

@ApiTags("tvshow")
@Controller("tvshow")
@UseInterceptors(AuthInterceptor)
export class TvShowController extends BaseEntityController {
  constructor(
    @Inject(TvShowRepository)
    private tvShowRepository: TvShowRepository,
    @Inject(TvShowQuery)
    private tvShowQuery: TvShowQuery,
    @Inject(TvShowService)
    private tvShowService: TvShowService,
    @Inject(DeleteTvShowUseCase)
    private deleteTvShowUseCase: DeleteTvShowUseCase
  ) {
    super(tvShowRepository);
  }

  @Post("")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiOperation({
    summary: "Create new TvShow.",
    description: "Create new TV Show endpoint. Requires authentication.",
  })
  @ApiResponse({
    status: 200,
    description: "Created entity",
    type: CreateTvShowResponseDTO,
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
  @ApiBody({ type: CreateTvShowDTO, required: true })
  async create(@Res() res: Response, @Body() dto: CreateTvShowDTO) {
    const response = await this.tvShowService.createTvShow(dto);
    this.ok(res, response);
  }

  @Get("details")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiQuery({
    name: "name",
    description: "Some actor name",
  })
  @ApiOperation({
    summary: "Details",
    description: "Show detail of an especific Tv Show.",
  })
  @ApiResponse({
    status: 200,
    description: "Created entity",
    type: TvShowDetailsResponseDTO,
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
  async showDetails(@Res() res: Response, @Query("name") name: string) {
    const result = await this.tvShowQuery.getTvShowDetails(name);
    this.ok(res, result);
  }

  @Delete("/:id")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiOperation({
    summary: "Delete",
    description: "Delete specific Tv Show",
  })
  @ApiResponse({
    status: 200,
    description: "Success",
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
  async delete(@Res() res: Response, @Param() params: any) {
    await this.deleteTvShowUseCase.execute(params.id);
    this.ok(res, "success");
  }
}
