import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthInterceptor } from "src/shared/core/interceptors/Auth.interceptor";
import { BaseEntityController } from "src/shared/infra/controller/BaseEntityController";
import { Response } from "express";

import { ActorRepository } from "../repository/impl/ActorRepository";
import {
  ActorDetailsResponseDTO,
  CreateActorDTO,
  CreateActorResponseDTO,
} from "./dtos/ActorDTO";
import {
  InvalidCredentialsResponseDTO,
  UnexpecteErrorDTO,
} from "src/shared/infra/controller/dtos/BaseDTO";
import { Public } from "nest-keycloak-connect";
import { CreateActorUseCase } from "../../application/usecases/CreateActorUseCase";
import { IUseCase } from "src/shared/core/IUseCase";
import ActorQuery from "../../application/query/ActorQuery";

@ApiTags("actor")
@Controller("actor")
@UseInterceptors(AuthInterceptor)
export class ActorController extends BaseEntityController {
  constructor(
    @Inject(ActorRepository)
    private actorRepository: ActorRepository,
    @Inject(CreateActorUseCase)
    private createActorUseCase: IUseCase<any, any>,
    @Inject(ActorQuery)
    private actorQuery: ActorQuery
  ) {
    super(actorRepository);
  }

  @Post("")
  @Public()
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
    required: true,
  })
  @ApiOperation({
    summary: "Create new Actor.",
    description: "Create new actor endpoint. Requires authentication.",
  })
  @ApiResponse({
    status: 200,
    description: "Created Entity",
    type: CreateActorResponseDTO,
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
  @ApiBody({ type: CreateActorDTO, required: true })
  async create(@Res() res: Response, @Body() dto: CreateActorDTO) {
    const response = await this.createActorUseCase.execute(dto);
    this.ok(res, response);
  }

  @Get("details")
  @Public()
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
    description: "Show detail of an especific Actor.",
  })
  @ApiResponse({
    status: 200,
    description: "Created entity",
    type: ActorDetailsResponseDTO,
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
    if (!name) return this.ok(res, []);
    const result = await this.actorQuery.getActorDetails(name);
    this.ok(res, result);
  }
}
