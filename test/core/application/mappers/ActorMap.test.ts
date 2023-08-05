import { faker } from "@faker-js/faker";
import { ActorDomain } from "src/modules/core/domain/entity/ActorDomain";
import { ActorMapper } from "src/modules/core/application/mappers/ActorMap";
import { actorProps, actorSavedMock } from "test/mocks/core/ActorMocks";
import { TvShowDomain } from "src/modules/core/domain/entity/TvShowDomain";
import { tvShowProps } from "test/mocks/core/TvShowMocks";

describe("ActorMap", () => {
  beforeEach(async () => {});

  describe("Teste ActorMapper", () => {
    test("Testa o método toPersistence", async () => {
      const tvShowDomain = TvShowDomain.create(tvShowProps);
      const actor = ActorDomain.create(actorProps);
      actor.addTvShow(tvShowDomain);

      const actorDb = ActorMapper.toPersistence(actor);

      expect(actorDb.id).toBeTruthy();
    });

    test("Testa o método toDoamin", async () => {
      const actorDomain = ActorMapper.toDomain(actorSavedMock);
      expect(actorDomain._id).toBeTruthy();
    });

    test("Testa o método toDoaminList", async () => {
      const actorDomainList = ActorMapper.toDomainList([actorSavedMock]);
      expect(actorDomainList).toHaveLength(1);
    });

    test("Testa o método toDoaminList passando uma lista vazia", async () => {
      const actorDomainList = ActorMapper.toDomainList([]);
      expect(actorDomainList).toHaveLength(0);
    });
  });
});
