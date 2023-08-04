import { Actor } from "@prisma/client";
import { Sql } from "@prisma/client/runtime";
import { IPaginationOptions } from "src/shared/core/interfaces/paginationOptions.interface";
import { ActorDomain } from "../../domain/entity/ActorDomain";

export interface IActorRepo {
  save(report: ActorDomain): Promise<any>;
  update(id: string, data: any): Promise<Actor>;
  findByNameAndBirthdate(name: string, birthDate: string);
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
  sqlRaw(query: Sql): Promise<any>;
}
