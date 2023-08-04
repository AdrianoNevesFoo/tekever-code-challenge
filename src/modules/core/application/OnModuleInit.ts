import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { IActorRepo } from "../infra/repository/IActorRepo";
import { IActorsOnTvShow } from "../infra/repository/IActorsOnTvShow";
import { IEpisodeRepo } from "../infra/repository/IEpisodeRepo";
import { ActorRepository } from "../infra/repository/impl/ActorRepository";
import { ActorsOnTvShowRepository } from "../infra/repository/impl/ActorsOnTvShowRepository";
import { EpisodeRepository } from "../infra/repository/impl/EpisodeRepository";
import { TvShowRepository } from "../infra/repository/impl/TvShowRepository";
import { ITvShowRepo } from "../infra/repository/ITvShowRepo";
import { Prisma } from "@prisma/client";
import { AuditRepository } from "src/shared/infra/repository/impl/AuditRepository";
import { IAuditRepo } from "src/shared/infra/repository/IAuditRepo";

@Injectable()
export class StartDataBase implements OnModuleInit {
  constructor(
    @Inject(ActorRepository)
    private actorRepo: IActorRepo,
    @Inject(TvShowRepository)
    private tvShowRepo: ITvShowRepo,
    @Inject(EpisodeRepository)
    private episodeReoo: IEpisodeRepo,
    @Inject(ActorsOnTvShowRepository)
    private ActorsOnTvShowRepo: IActorsOnTvShow,
    @Inject(AuditRepository)
    private auditRepo: IAuditRepo
  ) {}

  async onModuleInit() {
    await this.createActor();
    await this.createTvShow();
    await this.createEpisode();
    await this.createActorsOnTvShow();
    await this.createAudit();
  }

  private async createActor() {
    const query = Prisma.sql`
    CREATE TABLE IF NOT EXISTS Actor (
      id VARCHAR(191) NOT NULL,
      name VARCHAR(191) NOT NULL,
      age INTEGER NOT NULL,
      country VARCHAR(191) NOT NULL,
      birthDate VARCHAR(191) NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updatedAt DATETIME(3) NOT NULL,
  
      PRIMARY KEY (id)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;  
  `;
    const actors = await this.actorRepo.sqlRaw(query);
    console.log(actors);
  }

  private async createTvShow() {
    const query = Prisma.sql`
    CREATE TABLE IF NOT EXISTS TvShow (
      id VARCHAR(191) NOT NULL,
      name VARCHAR(191) NOT NULL,
      releaseDate VARCHAR(191) NOT NULL,
      endDate VARCHAR(191) NOT NULL,
      country VARCHAR(191) NOT NULL,
      productionCompany VARCHAR(191) NOT NULL,
      genre VARCHAR(191) NOT NULL,
      seasons INTEGER NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updatedAt DATETIME(3) NOT NULL,
  
      PRIMARY KEY (id)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  
  `;
    const actors = await this.tvShowRepo.sqlRaw(query);
    console.log(actors);
  }

  private async createAudit() {
    const query = Prisma.sql`
    CREATE TABLE IF NOT EXISTS Audit (
      entityId VARCHAR(191) NOT NULL,
      entityName VARCHAR(191) NOT NULL,
      history JSON NULL,
  
      PRIMARY KEY (entityId)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 
  `;
    const actors = await this.auditRepo.sqlRaw(query);
    console.log(actors);
  }

  private async createEpisode() {
    const query = Prisma.sql`
    CREATE TABLE IF NOT EXISTS Episode (
      id VARCHAR(191) NOT NULL,
      name VARCHAR(191) NOT NULL,
      number INTEGER NOT NULL,
      description TEXT NULL,
      time DOUBLE NOT NULL,
      season INTEGER NOT NULL,
      showId VARCHAR(191) NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updatedAt DATETIME(3) NOT NULL,
  
      PRIMARY KEY (id),
      CONSTRAINT Episode_showId_fkey FOREIGN KEY (showId) REFERENCES TvShow(id) ON DELETE RESTRICT ON UPDATE CASCADE
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;    
  `;
    const queryConstraint = Prisma.sql`
  ALTER TABLE Episode ADD CONSTRAINT IF NOT EXISTS Episode_showId_fkey FOREIGN KEY (showId) REFERENCES TvShow(id) ON DELETE RESTRICT ON UPDATE CASCADE;
  `;
    const actors = await this.episodeReoo.sqlRaw(query);
    console.log(actors);
  }

  private async createActorsOnTvShow() {
    const query = Prisma.sql`
    CREATE TABLE IF NOT EXISTS ActorsOnTvShows (
      showId VARCHAR(191) NOT NULL,
      actorId VARCHAR(191) NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updatedAt DATETIME(3) NOT NULL,
  
      PRIMARY KEY (showId, actorId),
      CONSTRAINT ActorsOnTvShows_showId_fkey FOREIGN KEY (showId) REFERENCES TvShow(id) ON DELETE RESTRICT ON UPDATE CASCADE,
      CONSTRAINT ActorsOnTvShows_actorId_fkey FOREIGN KEY (actorId) REFERENCES Actor(id) ON DELETE RESTRICT ON UPDATE CASCADE
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;  
  `;

    await this.ActorsOnTvShowRepo.sqlRaw(query);
  }
}
