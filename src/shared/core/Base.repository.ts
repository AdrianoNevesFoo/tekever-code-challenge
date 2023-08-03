import { PrismaRepository } from "../infra/database/prisma/PrismaRepository";
import { IPaginationMetadata } from "./interfaces/paginationMetadata.interface";
import { IPaginationOptions } from "./interfaces/paginationOptions.interface";
import { ClsService, ClsServiceManager } from "nestjs-cls";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Audit } from "../decorators/Audit.decorator";

export class BaseRepository {
  protected clsService: ClsService;

  public constructor(
    protected prisma: PrismaRepository,
    public emitter: EventEmitter2,
    readonly entityName: string
  ) {
    this.clsService = ClsServiceManager.getClsService();
  }

  @Audit()
  async create(entity: any): Promise<any> {
    return await this.prisma[this.entityName].create({ ...entity });
  }

  @Audit()
  async update(id: string, data: any): Promise<any> {
    return await this.prisma[this.entityName].update({
      where: { id },
      data,
    });
  }

  async paginate(params: {
    options: IPaginationOptions;
    where?: any;
    select?: any;
    include?: any;
    rejectOnNotFound?: any;
    orderBy?: any;
  }): Promise<any> {
    const { options, where, include, select } = params;
    const skipCalc = (options.page - 1) * options.limit;

    // let clone = JSON.parse(JSON.stringify(where));
    // this.formatRelations(clone);

    const transaction = await this.prisma.$transaction([
      this.prisma[this.entityName].count({
        where,
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma[this.entityName].findMany({
        skip: skipCalc < 0 ? 0 : skipCalc,
        take: options.limit,
        where,
        select,
        include,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);
    const totalPages = Math.ceil(transaction[0] / options.limit);

    const metadata = {
      itemCount: transaction[1].length,
      totalItems: transaction[0],
      itemsPerPage: options.limit,
      totalPages,
      currentPage: options.page == 0 ? 1 : options.page,
    } as IPaginationMetadata;

    return {
      items: transaction[1],
      meta: metadata,
    };
  }

  async findOne(params: { where: any }): Promise<any | undefined> {
    const { where } = params;
    if (!where) return undefined;
    return await this.prisma[this.entityName].findUnique({ where });
  }

  async findAll(params: {
    where: any;
    select?: any;
    include?: any;
    take?: any;
    rejectOnNotFound?: any;
    orderBy?: any;
  }): Promise<any[] | undefined> {
    const { where, select, include, take, rejectOnNotFound, orderBy } = params;
    const result = await this.prisma[this.entityName].findMany({
      where,
      select,
      include,
      take,
      rejectOnNotFound,
      orderBy,
    });
    return result;
  }

  async aggregate(params: {
    where?: any;
    _count?: any;
    _sum?: any;
  }): Promise<any[] | undefined> {
    const { where, _count, _sum } = params;
    const result = await this.prisma[this.entityName].aggregate({
      where,
      _count,
      _sum,
    });
    return result;
  }

  async count(params: { where: any }): Promise<any[] | undefined> {
    const { where } = params;
    const result = await this.prisma[this.entityName].count({ where });
    return result;
  }
}
