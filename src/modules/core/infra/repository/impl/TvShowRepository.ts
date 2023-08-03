import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { TvShow } from "@prisma/client";
import { TvShowMapper } from "src/modules/tvShows/application/mappers/TvShowMap";
import { TvShowDomain } from "src/modules/tvShows/domain/entity/TvShowDomain";
import { BaseRepository } from "src/shared/core/Base.repository";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { ITvShowRepo } from "../ITvShowRepo";

@Injectable()
export class TvShowRepository extends BaseRepository implements ITvShowRepo {
  constructor(
    private prismaRepository: PrismaRepository,
    public emitter: EventEmitter2
  ) {
    super(prismaRepository, emitter, "tvShow");
  }

  async save(tvShow: TvShowDomain): Promise<TvShow> {
    const tcShowDb = TvShowMapper.toPersistence(tvShow);
    return await this.create({
      data: tcShowDb,
    });
  }

  async findByNameAndProductionCompany(
    name: string,
    productionCompany: string
  ): Promise<TvShowDomain | undefined> {
    const tvShowDb = await this.prismaRepository.tvShow.findFirst({
      where: {
        AND: [{ name }, { productionCompany }],
      },
    });

    return tvShowDb ? TvShowMapper.toDomain(tvShowDb) : undefined;
  }

  async delete(id: string): Promise<void> {
    await this.prismaRepository.tvShow.delete({
      where: {
        id,
      },
    });
  }
}
