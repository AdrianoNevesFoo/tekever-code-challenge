import { Inject, Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import {
  ICreateTvShow,
  ITvShowEpisodes,
} from "src/shared/interfaces/TvShow.interface";
import {
  EpisodateProvider,
  IEpisodateEpisode,
  IEpisodateTvShow,
  IEpisodateTvShowDetails,
} from "../providers/Episodate.provider";
import { TvShowService } from "../services/Tvshow.service";
@Injectable()
export class CrawlerTvShowEventListener {
  static page = 1;
  constructor(
    @Inject(EpisodateProvider)
    private episodateProvider: EpisodateProvider,
    @Inject(TvShowService)
    private tvShowService: TvShowService
  ) {}

  @OnEvent("crawler.tvshow")
  async handle(): Promise<any> {
    try {
      const tvShows: IEpisodateTvShow[] =
        await this.episodateProvider.mostPopular(
          CrawlerTvShowEventListener.page
        );

      for (const tvShow of tvShows) {
        const details: IEpisodateTvShowDetails =
          await this.episodateProvider.details(tvShow.id);
        const episodes = this.buildEpisode(details?.episodes);
        const buildTvShow = this.buildTvShow(tvShow, details);
        buildTvShow.episodes = episodes;
        await this.tvShowService.createTvShow(buildTvShow);
      }
      CrawlerTvShowEventListener.page = CrawlerTvShowEventListener.page + 1;
    } catch (err) {
      Logger.log("Erro ao criar Tv Show");
      CrawlerTvShowEventListener.page = CrawlerTvShowEventListener.page + 1;
    }
  }

  private buildTvShow(
    tvshow: IEpisodateTvShow,
    details: IEpisodateTvShowDetails
  ) {
    return {
      name: tvshow.name,
      releaseDate: tvshow.start_date || new Date().toISOString(),
      endDate: tvshow.end_date,
      productionCompany: tvshow.network,
      country: tvshow.country,
      seasons: this.getSeasons(details?.episodes),
      genre: "",
      actors: [],
    } as ICreateTvShow;
  }

  private buildEpisode(episodes: IEpisodateEpisode[]): ITvShowEpisodes[] {
    return episodes?.map((episode) => {
      return {
        name: episode.name,
        number: episode.episode,
        description: "",
        time: 0,
        season: episode.season,
      } as ITvShowEpisodes;
    });
  }

  private getSeasons(
    episodes: IEpisodateEpisode[] | undefined
  ): number | undefined {
    const seasons = episodes?.map((episode) => episode.season);
    if (seasons) return Array.from(new Set(seasons)).length;
  }
}
