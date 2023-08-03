import { Inject, Injectable } from "@nestjs/common";
import AppError from "src/shared/core/errors/AppError";
import { IUseCase } from "src/shared/core/IUseCase";
import { IAssociateEpisode } from "src/shared/interfaces/Episode.interface";
import { EpisodeDomain } from "../../domain/entity/EpisodeDomain";
import { IEpisodeRepo } from "../../infra/repository/IEpisodeRepo";
import { EpisodeRepository } from "../../infra/repository/impl/EpisodeRepository";

@Injectable()
export class AssociateEpisodeUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(EpisodeRepository)
    private episodeRepository: IEpisodeRepo
  ) {}

  async execute(payload: IAssociateEpisode) {
    const foundEpisode = await this.episodeRepository.findByNameAndTvShowId(
      payload.name,
      payload.showId
    );

    if (foundEpisode)
      throw new AppError("Episode already associated to this Tv Show.", 400);

    const episodeDomain = EpisodeDomain.create(payload);

    return await this.episodeRepository.save(episodeDomain);
  }
}
