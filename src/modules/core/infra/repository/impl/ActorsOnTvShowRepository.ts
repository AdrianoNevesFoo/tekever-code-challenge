import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { BaseRepository } from "src/shared/core/Base.repository";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { IActorsOnTvShow } from "../IActorsOnTvShow";

@Injectable()
export class ActorsOnTvShowRepository
  extends BaseRepository
  implements IActorsOnTvShow
{
  constructor(
    private prismaRepository: PrismaRepository,
    public emitter: EventEmitter2
  ) {
    super(prismaRepository, emitter, "actorsOnTvShows");
  }

  async delete(actorId: string, showId: string): Promise<void> {
    await this.prismaRepository.actorsOnTvShows.delete({
      where: {
        showId_actorId: {
          showId,
          actorId,
        },
      },
    });
  }
}
