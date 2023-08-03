import { Inject, Injectable } from "@nestjs/common";
import AppError from "src/shared/core/errors/AppError";
import { IUseCase } from "src/shared/core/IUseCase";
import { ICreateActor } from "src/shared/interfaces/Actor.interface";
import { ActorDomain } from "../../domain/entity/ActorDomain";
import { TvShowDomain } from "../../domain/entity/TvShowDomain";
import { IActorRepo } from "../../infra/repository/IActorRepo";
import { ActorRepository } from "../../infra/repository/impl/ActorRepository";
import { TvShowRepository } from "../../infra/repository/impl/TvShowRepository";
import { ITvShowRepo } from "../../infra/repository/ITvShowRepo";
import { TvShowMapper } from "../mappers/TvShowMap";

@Injectable()
export class CreateActorUseCase implements IUseCase<any, any> {
  constructor(
    @Inject(ActorRepository)
    private actorRepo: IActorRepo,
    @Inject(TvShowRepository)
    private tvShowRepo: ITvShowRepo
  ) {}

  async execute(payload: ICreateActor) {
    const foundActor = await this.actorRepo.findByNameAndBirthdate(
      payload.name,
      payload.birthDate
    );

    if (foundActor) throw new AppError("Actor already exists!", 400);
    const tvShows = await this.getAllTvShows(payload.tvShows);
    const actorDomain = ActorDomain.create({ ...payload, tvShows });
    return await this.actorRepo.save(actorDomain);
  }

  private async getAllTvShows(
    tvShows: string[] | undefined
  ): Promise<TvShowDomain[]> {
    let result: TvShowDomain[] = [];
    if (tvShows && tvShows.length > 0) {
      const tvShowDbList = await this.tvShowRepo.findAll({
        where: {
          id: {
            in: tvShows,
          },
        },
      });

      const tvShowDomainList = TvShowMapper.toDomainList(tvShowDbList);
      result = tvShowDomainList.filter((a) => a) as TvShowDomain[];
    }
    return result;
  }
}
