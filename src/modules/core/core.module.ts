import { forwardRef, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { AuditRepository } from "src/shared/infra/repository/impl/AuditRepository";
import { SharedModule } from "src/shared/shared.module";
import { CrawlerTvShowEventListener } from "./application/listeners/CrawlerTvShowEventListener";
import { StartDataBase } from "./application/OnModuleInit";
import { EpisodateProvider } from "./application/providers/Episodate.provider";
import ActorQuery from "./application/query/ActorQuery";
import TvShowQuery from "./application/query/TvShowQuery";
import { TvShowService } from "./application/services/Tvshow.service";
import { AssociateEpisodeUseCase } from "./application/usecases/AssociateEpisodeUseCase";
import { CreateActorUseCase } from "./application/usecases/CreateActorUseCase";
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
    AssociateEpisodeUseCase,
    EpisodeRepository,
    TvShowQuery,
    ActorQuery,
    DeleteTvShowUseCase,
    ActorsOnTvShowRepository,
    StartDataBase,
    AuditRepository,
    EpisodateProvider,
    CrawlerTvShowEventListener,
    TvShowService,
  ],
})
export class CoreModule {}
