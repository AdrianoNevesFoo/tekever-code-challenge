import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Public } from "nest-keycloak-connect";
import { AuthInterceptor } from "src/shared/core/interceptors/Auth.interceptor";
import { BaseController } from "src/shared/infra/controller/BaseController";
import { CreateUserUseCase } from "../../application/usecases/CreateUserUseCase";
import { InvalidCredentialsResponseDTO } from "../dtos/AccessTokenDTO";
import { CreateNewUserDTO } from "../dtos/UserDTO";

@ApiTags("user")
@Controller("user")
@UseInterceptors(AuthInterceptor)
export class UserController extends BaseController {
  constructor(
    @Inject(CreateUserUseCase)
    private createUserUseCase: CreateUserUseCase
  ) {
    super();
  }

  @Post("")
  @Public()
  @ApiOperation({
    summary: "Create new User.",
    description: "Create new user endpoint.",
  })
  @ApiResponse({
    status: 200,
    description: "Success",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid user credentials",
    type: InvalidCredentialsResponseDTO,
  })
  async createNewUser(@Res() res: Response, @Body() dto: CreateNewUserDTO) {
    const result = await this.createUserUseCase.execute(dto);
    this.ok(res, result);
  }
}
