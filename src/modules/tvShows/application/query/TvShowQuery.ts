import { Inject, Injectable } from "@nestjs/common";
import { TvShow } from "@prisma/client";
import { TvShowRepository } from "../../infra/repository/impl/TvShowRepository";
import { ITvShowRepo } from "../../infra/repository/ITvShowRepo";

@Injectable()
export default class TvShowQuery {
  constructor(
    @Inject(TvShowRepository)
    private tvShowRepo: ITvShowRepo
  ) {}

  async getTvShowDetails(name: string): Promise<TvShow[] | undefined> {
    return await this.tvShowRepo.findAll({
      where: {
        name,
      },
      include: {
        episodes: true,
        starring: {
          select: {
            actor: true,
          },
        },
      },
    });
  }
}
