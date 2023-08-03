import { Actor, Prisma } from "@prisma/client";
import { ICreateActor } from "src/shared/interfaces/Actor.interface";
import { ActorDomain, ActorProps } from "../../domain/entity/ActorDomain";

export class ActorMapper {
  static toDomain(dbActor: Actor): ActorDomain {
    const actorProps = {
      name: dbActor.name,
      age: dbActor.age,
      birthDate: dbActor.birthDate,
      country: dbActor.country,
    } as ActorProps;

    return ActorDomain.create(actorProps, dbActor.id);
  }

  static toDomainList(
    dbActors: Actor[] | undefined
  ): (ActorDomain | undefined)[] | [] {
    if (dbActors && dbActors.length > 0) {
      const actorDomainList = dbActors.map((dbActor) => {
        return this.toDomain(dbActor);
      });
      return actorDomainList;
    }
    return [];
  }

  static toPersistence(actor: ActorDomain): Prisma.ActorCreateInput {
    let actorsOnTvShows = {};
    if (actor.tvShows) {
      const connectTvShows = actor.tvShows.map((tvShow) => {
        return { tvShow: { connect: { id: tvShow._id } } };
      });
      actorsOnTvShows = {
        create: connectTvShows,
      };
    }

    return {
      id: actor._id,
      name: actor.name,
      age: actor.age,
      birthDate: actor.birthDate,
      country: actor.country,
      actorsOnTvShows,
    } as Prisma.ActorCreateInput;
  }
}
