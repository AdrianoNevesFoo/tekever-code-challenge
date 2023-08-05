import { TvShowMapper } from "src/modules/core/application/mappers/TvShowMap";
import { EpisodeDomain } from "src/modules/core/domain/entity/EpisodeDomain";
import { TvShowDomain } from "src/modules/core/domain/entity/TvShowDomain";
import { episodeProps } from "test/mocks/core/EpisodeMocks";
import { tvShowProps, tvShowSavedMock } from "test/mocks/core/TvShowMocks";

describe("TvShow", () => {
  beforeEach(async () => {});

  describe("Teste TvShowMapper", () => {
    test("Testa o método toPersistence", async () => {
      const episodeDomain = EpisodeDomain.create(episodeProps);
      const tvShow = TvShowDomain.create(tvShowProps);
      tvShow.addEpisode(episodeDomain);
      const tvShowDb = TvShowMapper.toPersistence(tvShow);

      expect(tvShowDb.id).toBeTruthy();
    });

    test("Testa o método toPersistence sem episodes", async () => {
      const tvShow = TvShowDomain.create(tvShowProps);
      const tvShowDb = TvShowMapper.toPersistence(tvShow);

      expect(tvShowDb.id).toBeTruthy();
    });

    test("Testa o método toDoamin", async () => {
      const tvShowDomain = TvShowMapper.toDomain(tvShowSavedMock);
      expect(tvShowDomain._id).toBeTruthy();
    });

    test("Testa o método toDoaminList", async () => {
      const tvShowDomainList = TvShowMapper.toDomainList([tvShowSavedMock]);
      expect(tvShowDomainList).toHaveLength(1);
    });

    test("Testa o método toDoaminList passando uma lista vazia", async () => {
      const tvShowDomainList = TvShowMapper.toDomainList([]);
      expect(tvShowDomainList).toHaveLength(0);
    });
  });
});
