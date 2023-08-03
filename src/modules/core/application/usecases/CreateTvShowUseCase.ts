import { Inject, Injectable } from "@nestjs/common";
import AppError from "src/shared/core/errors/AppError";
import { IUseCase } from "src/shared/core/IUseCase";
import {
  ICreateTvShow,
  ITvShowEpisodes,
} from "src/shared/interfaces/TvShow.interface";
import { ActorDomain } from "../../domain/entity/ActorDomain";
import { EpisodeDomain } from "../../domain/entity/EpisodeDomain";
import { TvShowDomain } from "../../domain/entity/TvShowDomain";
import { IActorRepo } from "../../infra/repository/IActorRepo";
import { ActorRepository } from "../../infra/repository/impl/ActorRepository";
import { TvShowRepository } from "../../infra/repository/impl/TvShowRepository";
import { ITvShowRepo } from "../../infra/repository/ITvShowRepo";
import { ActorMapper } from "../mappers/ActorMap";

@Injectable()
export class CreateTvShowUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(ActorRepository)
    private actorRepo: IActorRepo,
    @Inject(TvShowRepository)
    private tvShowRepo: ITvShowRepo
  ) {}

  async execute(payload: ICreateTvShow) {
    const foundTvShow = await this.tvShowRepo.findByNameAndProductionCompany(
      payload.name,
      payload.productionCompany
    );
    if (foundTvShow) throw new AppError("TvShow already exists!", 400);

    const episodeDomainList = this.buildEpisodesDomain(payload.episodes);
    const tvShowDomain = TvShowDomain.create({
      ...payload,
      actors: payload.actors,
      episodes: episodeDomainList,
    });

    return await this.tvShowRepo.save(tvShowDomain);
  }

  private buildEpisodesDomain(episodes: ITvShowEpisodes[]): EpisodeDomain[] {
    if (episodes) {
      return episodes.map((episode) => EpisodeDomain.create(episode));
    }
    return [];
  }

  private async getAllActors(ids: string[]) {
    let result: ActorDomain[] = [];
    if (ids) {
      const actors = await this.actorRepo.findAll({
        where: {
          id: {
            in: ids,
          },
        },
      });
      const actorDomainList = ActorMapper.toDomainList(actors);
      result = actorDomainList.filter((a) => a) as ActorDomain[];
    }
    return result;
  }
}
