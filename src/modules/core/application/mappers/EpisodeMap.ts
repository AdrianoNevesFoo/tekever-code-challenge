import { Episode, Prisma, TvShow } from "@prisma/client";
import { EpisodeDomain, EpisodeProps } from "../../domain/entity/EpisodeDomain";

export class EpisodeMapper {
  static toDomain(dbEpisode: Episode): EpisodeDomain {
    const episodeProps = {} as EpisodeProps;

    return EpisodeDomain.create(episodeProps, dbEpisode.id);
  }

  static toDomainList(
    dbEpisodes: Episode[] | undefined
  ): (EpisodeDomain | undefined)[] | [] {
    if (dbEpisodes && dbEpisodes.length > 0) {
      const EpisodeDomainList = dbEpisodes.map((dbTvShow) => {
        return this.toDomain(dbTvShow);
      });
      return EpisodeDomainList;
    }
    return [];
  }

  static toPersistence(episode: EpisodeDomain): Prisma.EpisodeCreateInput {
    let tvShow = {};
    if (episode.showId) {
      tvShow = {
        connect: { id: episode.showId },
      };
    }

    return {
      id: episode._id,
      name: episode.name,
      number: episode.number,
      description: episode.description,
      time: episode.time,
      season: episode.season,
      tvShow,
    } as Prisma.EpisodeCreateInput;
  }
}
