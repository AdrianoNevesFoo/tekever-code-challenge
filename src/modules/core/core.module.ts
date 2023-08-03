import { forwardRef, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { SharedModule } from "src/shared/shared.module";
import ActorQuery from "./application/query/ActorQuery";
import TvShowQuery from "./application/query/TvShowQuery";
import { AssociateEpisodeUseCase } from "./application/usecases/AssociateEpisodeUseCase";
import { CreateActorUseCase } from "./application/usecases/CreateActorUseCase";
import { CreateTvShowUseCase } from "./application/usecases/CreateTvShowUseCase";
import { DeleteTvShowUseCase } from "./application/usecases/DeleteTvShowUseCase";
import { ActorController } from "./infra/controllers/Actor.controller";
import { EpisodeController } from "./infra/controllers/Episode.controller";
import { TvShowController } from "./infra/controllers/TvShow.controller";
import { ActorRepository } from "./infra/repository/impl/ActorRepository";
import { ActorsOnTvShowRepository } from "./infra/repository/impl/ActorsOnTvShowRepository";
import { EpisodeRepository } from "./infra/repository/impl/EpisodeRepository";
import { TvShowRepository } from "./infra/repository/impl/TvShowRepository";

@Module({
  imports: [SharedModule, forwardRef(() => CoreModule)],
  controllers: [ActorController, EpisodeController, TvShowController],
  providers: [
    PrismaRepository,
    JwtService,
    ActorRepository,
    TvShowRepository,
    CreateActorUseCase,
    CreateTvShowUseCase,
    AssociateEpisodeUseCase,
    EpisodeRepository,
    TvShowQuery,
    ActorQuery,
    DeleteTvShowUseCase,
    ActorsOnTvShowRepository,
  ],
})
export class CoreModule {}
