import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Public } from "nest-keycloak-connect";
import { BaseController } from "src/shared/infra/controller/BaseController";
import { GetTokenUseCase } from "../../application/usecases/GetTokenUsecase";
import {
  IGetTokenDTO,
  InvalidCredentialsResponseDTO,
  TokenResponseDTO,
} from "../dtos/AccessTokenDTO";

@ApiTags("oauth")
@Controller("oauth")
export class AccessTokenController extends BaseController {
  constructor(
    @Inject(GetTokenUseCase)
    private getTokenUseCase: GetTokenUseCase
  ) {
    super();
  }

  @Post("token")
  @ApiOperation({
    summary: "Get access token.",
    description:
      "Endpoint de autenticação. Esse endpoint deve ser utilziado para o fluxo de autenticação do tipo password e client_credentials.",
  })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: TokenResponseDTO,
  })
  @ApiResponse({
    status: 403,
    description: "Invalid user credentials",
    type: InvalidCredentialsResponseDTO,
  })
  @Public()
  async login(@Res() res: Response, @Body() dto: IGetTokenDTO) {
    const result = await this.getTokenUseCase.execute(dto);
    this.ok(res, result);
  }
}
