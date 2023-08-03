import { IPaginationOptions } from "src/shared/core/interfaces/paginationOptions.interface";

export interface IActorsOnTvShow {
  delete(actorId: string, showId: string): Promise<void>;
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
