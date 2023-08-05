import { Test } from "@nestjs/testing";
import * as nock from "nock";
import { RealmMaster } from "src/modules/auth/RealmMaster.decorator";
import { EpisodateProvider } from "src/modules/core/application/providers/Episodate.provider";
import { mostPopularMock } from "test/mocks/core/TvShowMocks";

describe("Episodate Provider", () => {
  let episodateProvider: EpisodateProvider;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EpisodateProvider],
    }).compile();

    episodateProvider = module.get<EpisodateProvider>(EpisodateProvider);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(episodateProvider).toBeDefined();
    expect(RealmMaster).toBeDefined();
  });

  describe("Episodate Provider", () => {
    it("Most popular", async () => {
      const mostpopular = nock("https://www.episodate.com")
        .get(`/api/most-popular?page=1`)
        .reply(200, mostPopularMock);
      const resp = await episodateProvider.mostPopular(1);
    });

    it("Most popular error", async () => {
      const mostpopular = nock("https://www.episodate.com")
        .get(`/api/most-popular?page=1`)
        .reply(400);

      try {
        const resp = await episodateProvider.mostPopular(1);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Details", async () => {
      const mostpopular = nock("https://www.episodate.com")
        .get(`/api/show-details?q=1`)
        .reply(200, mostPopularMock);
      const resp = await episodateProvider.details(1);
    });

    it("Details Error", async () => {
      const mostpopular = nock("https://www.episodate.com")
        .get(`/api/show-details?q=1`)
        .reply(400);

      try {
        const resp = await episodateProvider.details(1);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });
});
