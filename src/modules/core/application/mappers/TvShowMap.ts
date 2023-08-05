import { Prisma, TvShow } from "@prisma/client";
import { EpisodeDomain } from "../../domain/entity/EpisodeDomain";
import { TvShowDomain, TvShowProps } from "../../domain/entity/TvShowDomain";

export class TvShowMapper {
  static toDomain(dbTvShow: TvShow): TvShowDomain {
    const tsShowProps = {
      name: dbTvShow.name,
      releaseDate: dbTvShow.releaseDate,
      endDate: dbTvShow.endDate,
      country: dbTvShow.country,
      productionCompany: dbTvShow.productionCompany,
      genre: dbTvShow.genre,
      seasons: dbTvShow.seasons,
    } as TvShowProps;

    return TvShowDomain.create(tsShowProps, dbTvShow.id);
  }

  static toDomainList(
    dbTvShows: TvShow[] | undefined
  ): (TvShowDomain | undefined)[] | [] {
    if (dbTvShows && dbTvShows.length > 0) {
      const TvShowDomainList = dbTvShows.map((dbTvShow) => {
        return this.toDomain(dbTvShow);
      });
      return TvShowDomainList;
    }
    return [];
  }

  static toPersistence(tvShow: TvShowDomain): Prisma.TvShowCreateInput {
    let starring = {};
    if (tvShow.actors) {
      const connectActors = tvShow.actors.map((actor) => {
        return { actor: { connect: { id: actor } } };
      });
      starring = {
        create: connectActors,
      };
    }

    let episodes = {};
    if (tvShow.episodes) {
      episodes = {
        create: this.buildEpisodes(tvShow.episodes),
      };
    }

    return {
      id: tvShow._id,
      name: tvShow.name,
      releaseDate: tvShow.releaseDate,
      endDate: tvShow.endDate,
      country: tvShow.country,
      productionCompany: tvShow.productionCompany,
      seasons: tvShow.seasons,
      genre: tvShow.genre,
      starring,
      episodes,
    } as Prisma.TvShowCreateInput;
  }

  static buildEpisodes(episodes: EpisodeDomain[]): any[] | undefined {
    if (episodes) {
      return episodes.map((episode) => {
        return {
          id: episode._id,
          name: episode.name,
          number: episode.number,
          description: episode.description,
          time: episode.time,
          season: episode.season,
        };
      });
    }
  }
}
