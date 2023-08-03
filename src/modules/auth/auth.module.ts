import { forwardRef, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { SharedModule } from "src/shared/shared.module";
import { AccessTokenProvider } from "./application/providers/AccessToken.provider";
import { UserProvider } from "./application/providers/User.provider";
import { CreateUserUseCase } from "./application/usecases/CreateUserUseCase";
import { GetTokenUseCase } from "./application/usecases/GetTokenUsecase";
import { BaseKeycloakProvider } from "./BaseKeycloakProvider";
import { AccessTokenController } from "./infra/controllers/AccessToken.controller";
import { UserController } from "./infra/controllers/User.controller";

@Module({
  imports: [SharedModule, forwardRef(() => AuthModule)],
  controllers: [AccessTokenController, UserController],
  providers: [
    BaseKeycloakProvider,
    AccessTokenProvider,
    PrismaRepository,
    JwtService,
    GetTokenUseCase,
    CreateUserUseCase,
    UserProvider,
  ],
})
export class AuthModule {}
