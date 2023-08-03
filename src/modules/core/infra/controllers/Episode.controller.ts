import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthInterceptor } from "src/shared/core/interceptors/Auth.interceptor";
import { BaseEntityController } from "src/shared/infra/controller/BaseEntityController";
import { Response } from "express";
import { Public } from "nest-keycloak-connect";
import { EpisodeRepository } from "../repository/impl/EpisodeRepository";
import { InvalidCredentialsResponseDTO } from "src/modules/auth/infra/dtos/AccessTokenDTO";
import { UnexpecteErrorDTO } from "src/shared/infra/controller/dtos/BaseDTO";
import {
  AssociateEpisodeDTO,
  AssociateEpisodeResponseDTO,
} from "./dtos/EpisodeDTO";
import { AssociateEpisodeUseCase } from "../../application/usecases/AssociateEpisodeUseCase";

@ApiTags("episode")
@Controller("episode")
@UseInterceptors(AuthInterceptor)
export class EpisodeController extends BaseEntityController {
  constructor(
    @Inject(EpisodeRepository)
    private episodeRepository: EpisodeRepository,
    @Inject(AssociateEpisodeUseCase)
    private associateEpisodeUseCase: AssociateEpisodeUseCase
  ) {
    super(episodeRepository);
  }

  @Post("")
  @Public()
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiOperation({
    summary: "Add new episode.",
    description: "Add new episode to specific Tv Show.",
  })
  @ApiResponse({
    status: 200,
    description: "Created Entity",
    type: AssociateEpisodeResponseDTO,
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
  @ApiBody({ type: AssociateEpisodeDTO, required: true })
  async create(@Res() res: Response, @Body() dto: AssociateEpisodeDTO) {
    const response = await this.associateEpisodeUseCase.execute(dto);
    this.ok(res, response);
  }
}
