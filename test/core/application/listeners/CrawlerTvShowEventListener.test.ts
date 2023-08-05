import { Test } from "@nestjs/testing";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MockEventEmitter } from "test/mocks/EventEmitterMock";
import { CrawlerTvShowEventListener } from "src/modules/core/application/listeners/CrawlerTvShowEventListener";
import { EpisodateProvider } from "src/modules/core/application/providers/Episodate.provider";
import { TvShowService } from "src/modules/core/application/services/Tvshow.service";
import { TvShowRepository } from "src/modules/core/infra/repository/impl/TvShowRepository";
import {
  mostPopularMock,
  tvShowDetails,
  tvShowDetailsWithoutEpisodes,
} from "test/mocks/core/TvShowMocks";

describe("Event Listener", () => {
  let crawlerTvShowEventListener: CrawlerTvShowEventListener;
  let episodateProvider: EpisodateProvider;
  let tvShowService: TvShowService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CrawlerTvShowEventListener,
        EpisodateProvider,
        TvShowService,
        TvShowRepository,
        PrismaRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
      ],
    }).compile();
    crawlerTvShowEventListener = module.get<CrawlerTvShowEventListener>(
      CrawlerTvShowEventListener
    );
  });

  it("Deve ter o useCase instanciado", () => {
    expect(crawlerTvShowEventListener).toBeDefined();
  });

  describe("Deve fazer um crawler de tv shows", () => {
    it("Deve fazer um crawler de tv shows", async () => {
      jest
        .spyOn(EpisodateProvider.prototype as any, "mostPopular")
        .mockResolvedValue(mostPopularMock);
      jest
        .spyOn(EpisodateProvider.prototype as any, "details")
        .mockResolvedValue(tvShowDetails);

      jest
        .spyOn(TvShowService.prototype as any, "createTvShow")
        .mockResolvedValue(undefined);

      expect(await crawlerTvShowEventListener.handle()).toBe(undefined);
    });
  });

  describe("Deve fazer um crawler de tv shows sem episodios", () => {
    it("Deve fazer um crawler de tv shows sem episodios", async () => {
      jest
        .spyOn(EpisodateProvider.prototype as any, "mostPopular")
        .mockResolvedValue(mostPopularMock);
      jest
        .spyOn(EpisodateProvider.prototype as any, "details")
        .mockResolvedValue(tvShowDetailsWithoutEpisodes);

      jest
        .spyOn(TvShowService.prototype as any, "createTvShow")
        .mockResolvedValue(undefined);

      expect(await crawlerTvShowEventListener.handle()).toBe(undefined);
    });
  });

  describe("Deve tentar executar o crawler", () => {
    it("Deve tentar executar o crawler", async () => {
      jest
        .spyOn(EpisodateProvider.prototype as any, "mostPopular")
        .mockResolvedValue(undefined);
      jest
        .spyOn(EpisodateProvider.prototype as any, "details")
        .mockResolvedValue(undefined);

      jest
        .spyOn(TvShowService.prototype as any, "createTvShow")
        .mockResolvedValue(undefined);

      expect(await crawlerTvShowEventListener.handle()).toBe(undefined);
    });
  });
});
