import { Inject, Injectable } from "@nestjs/common";
import { IUseCase } from "src/shared/core/IUseCase";
import { IActorsOnTvShow } from "../../infra/repository/IActorsOnTvShow";
import { ActorsOnTvShowRepository } from "../../infra/repository/impl/ActorsOnTvShowRepository";
import { EpisodeRepository } from "../../infra/repository/impl/EpisodeRepository";
import { TvShowRepository } from "../../infra/repository/impl/TvShowRepository";
import { ITvShowRepo } from "../../infra/repository/ITvShowRepo";

@Injectable()
export class DeleteTvShowUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(TvShowRepository)
    private tvShowRepo: ITvShowRepo,
    @Inject(EpisodeRepository)
    private episodeRepository: EpisodeRepository,
    @Inject(ActorsOnTvShowRepository)
    private actorsOnTvShowRepository: IActorsOnTvShow
  ) {}

  async execute(showId: string) {
    const episodesIds = await this.getEpisodes(showId);
    await this.deleteAllEpisodes(episodesIds);
    await this.delteActorsOnTvShow(showId);
    await this.tvShowRepo.delete(showId);
  }

  private async deleteAllEpisodes(episodesIds: string[] | undefined) {
    if (episodesIds) {
      await this.episodeRepository.deleteMany(episodesIds);
    }
  }

  private async delteActorsOnTvShow(showId: string): Promise<void> {
    const actorsOnTvShow = await this.actorsOnTvShowRepository.findAll({
      where: {
        showId,
      },
    });

    if (actorsOnTvShow) {
      for (const actorOnTvShow of actorsOnTvShow) {
        await this.actorsOnTvShowRepository.delete(
          actorOnTvShow.actorId,
          showId
        );
      }
    }
  }

  private async getEpisodes(showId: string): Promise<string[] | undefined> {
    const foundEpisodes = await this.episodeRepository.findAll({
      where: {
        showId,
      },
    });
    return foundEpisodes
      ? foundEpisodes.map((episode) => episode.id)
      : undefined;
  }
}
