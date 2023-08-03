import { TvShow } from "@prisma/client";
import { IPaginationOptions } from "src/shared/core/interfaces/paginationOptions.interface";
import { TvShowDomain } from "../../domain/entity/TvShowDomain";

export interface ITvShowRepo {
  save(report: TvShowDomain): Promise<any>;
  update(id: string, data: any): Promise<TvShow>;
  findByNameAndProductionCompany(name: string, productionCompany: string);
  delete(id: string): Promise<void>;
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
