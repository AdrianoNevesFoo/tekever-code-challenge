import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Episode } from "@prisma/client";
import { EpisodeMapper } from "src/modules/tvShows/application/mappers/EpisodeMap";
import { EpisodeDomain } from "src/modules/tvShows/domain/entity/EpisodeDomain";
import { BaseRepository } from "src/shared/core/Base.repository";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { IEpisodeRepo } from "../IEpisodeRepo";

@Injectable()
export class EpisodeRepository extends BaseRepository implements IEpisodeRepo {
  constructor(
    private prismaRepository: PrismaRepository,
    public emitter: EventEmitter2
  ) {
    super(prismaRepository, emitter, "episode");
  }
  async findByNameAndTvShowId(
    name: string,
    tvShowId: string
  ): Promise<EpisodeDomain | undefined> {
    const foundEpisode = await this.prismaRepository.episode.findFirst({
      where: {
        name,
        showId: tvShowId,
      },
    });
    return foundEpisode ? EpisodeMapper.toDomain(foundEpisode) : undefined;
  }

  async save(episode: EpisodeDomain): Promise<Episode> {
    const episodeDb = EpisodeMapper.toPersistence(episode);
    return await this.create({
      data: episodeDb,
    });
  }
  async delete(id: string): Promise<void> {
    await this.prismaRepository.episode.delete({
      where: {
        id,
      },
    });
  }
  async deleteMany(ids: string[]): Promise<void> {
    await this.prismaRepository.episode.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
