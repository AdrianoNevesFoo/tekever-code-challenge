import { faker } from "@faker-js/faker";
import { ActorDomain } from "src/modules/core/domain/entity/ActorDomain";
import { ActorMapper } from "src/modules/core/application/mappers/ActorMap";
import { actorSavedMock } from "test/mocks/core/ActorMocks";
import { EpisodeMapper } from "src/modules/core/application/mappers/EpisodeMap";
import { EpisodeDomain } from "src/modules/core/domain/entity/EpisodeDomain";
import { episodeProps, episodeSavedMock } from "test/mocks/core/EpisodeMocks";

describe("EpisodeMap", () => {
  beforeEach(async () => {});

  describe("Teste EpisodeMapper", () => {
    test("Testa o método toPersistence", async () => {
      const episode = EpisodeDomain.create(episodeProps);

      const episodeDb = EpisodeMapper.toPersistence(episode);

      expect(episodeDb.id).toBeTruthy();
    });

    test("Testa o método toDoamin", async () => {
      const episodeDomain = EpisodeMapper.toDomain(episodeSavedMock);
      expect(episodeDomain._id).toBeTruthy();
    });

    test("Testa o método toDoaminList", async () => {
      const episodeDomainList = EpisodeMapper.toDomainList([episodeSavedMock]);
      expect(episodeDomainList).toHaveLength(1);
    });

    test("Testa o método toDoaminList passando uma lista vazia", async () => {
      const episodeDomainList = EpisodeMapper.toDomainList([]);
      expect(episodeDomainList).toHaveLength(0);
    });
  });
});
