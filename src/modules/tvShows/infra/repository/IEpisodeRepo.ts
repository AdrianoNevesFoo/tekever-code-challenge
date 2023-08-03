import { Episode } from "@prisma/client";
import { IPaginationOptions } from "src/shared/core/interfaces/paginationOptions.interface";
import { EpisodeDomain } from "../../domain/entity/EpisodeDomain";

export interface IEpisodeRepo {
  save(report: EpisodeDomain): Promise<any>;
  update(id: string, data: any): Promise<Episode>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  findByNameAndTvShowId(
    name: string,
    tvShowId: string
  ): Promise<EpisodeDomain | undefined>;
  paginate(params: {
    options: IPaginationOptions;
    where?: any;
    select?: any;
    include?: any;
    rejectOnNotFound?: any;
    orderBy?: any;
  }): Promise<any>;

  findOne(params: { where: any }): Promise<any | undefined>;
  findAll(params: {
    where: any;
    select?: any;
    include?: any;
    take?: any;
    rejectOnNotFound?: any;
    orderBy?: any;
  }): Promise<any[] | undefined>;
}
