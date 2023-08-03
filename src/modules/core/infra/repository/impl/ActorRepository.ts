import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Actor } from "@prisma/client";
import { ActorMapper } from "src/modules/core/application/mappers/ActorMap";
import { ActorDomain } from "src/modules/core/domain/entity/ActorDomain";
import { BaseRepository } from "src/shared/core/Base.repository";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { IActorRepo } from "../IActorRepo";

@Injectable()
export class ActorRepository extends BaseRepository implements IActorRepo {
  constructor(
    private prismaRepository: PrismaRepository,
    public emitter: EventEmitter2
  ) {
    super(prismaRepository, emitter, "actor");
  }

  async save(actor: ActorDomain): Promise<Actor> {
    const actorDb = ActorMapper.toPersistence(actor);
    return await this.create({
      data: actorDb,
    });
  }

  async findByNameAndBirthdate(
    name: string,
    birthDate: string
  ): Promise<ActorDomain | undefined> {
    const actorDb = await this.prismaRepository.actor.findFirst({
      where: {
        AND: [{ name }, { birthDate }],
      },
    });
    return actorDb ? ActorMapper.toDomain(actorDb) : undefined;
  }
}
