import { Inject, Injectable } from "@nestjs/common";
import { Actor, TvShow } from "@prisma/client";
import { IActorRepo } from "../../infra/repository/IActorRepo";
import { ActorRepository } from "../../infra/repository/impl/ActorRepository";

@Injectable()
export default class ActorQuery {
  constructor(
    @Inject(ActorRepository)
    private actorRepository: IActorRepo
  ) {}

  async getActorDetails(name: string): Promise<Actor[] | undefined> {
    return await this.actorRepository.findAll({
      where: {
        name,
      },
      include: {
        actorsOnTvShows: {
          select: {
            tvShow: true,
          },
        },
      },
    });
  }
}
