import { Inject, Injectable } from "@nestjs/common";
import AppError from "src/shared/core/errors/AppError";
import { IUseCase } from "src/shared/core/IUseCase";
import {
  ICreateTvShow,
  ITvShowEpisodes,
} from "src/shared/interfaces/TvShow.interface";
import { EpisodeDomain } from "../../domain/entity/EpisodeDomain";
import { TvShowDomain } from "../../domain/entity/TvShowDomain";
import { TvShowRepository } from "../../infra/repository/impl/TvShowRepository";
import { ITvShowRepo } from "../../infra/repository/ITvShowRepo";

@Injectable()
export class CreateTvShowUseCase implements IUseCase<any, any> {
  constructor(
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
    return episodes.map((episode) => EpisodeDomain.create(episode));
  }
}
