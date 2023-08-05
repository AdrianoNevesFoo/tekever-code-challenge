import { Test } from "@nestjs/testing";
import { TvShowRepository } from "src/modules/core/infra/repository/impl/TvShowRepository";
import { createtvShowMock, tvShowSavedMock } from "test/mocks/core/TvShowMocks";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MockEventEmitter } from "test/mocks/EventEmitterMock";
import { TvShowService } from "src/modules/core/application/services/Tvshow.service";

describe("Create TvShow", () => {
  let tvShowService: TvShowService;
  let tvShowRepository: TvShowRepository;
  let prismaRepository: PrismaRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TvShowService,
        TvShowRepository,
        PrismaRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
      ],
    }).compile();
    tvShowService = module.get<TvShowService>(TvShowService);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(tvShowService).toBeDefined();
  });

  describe("Deve criar um TvShow", () => {
    it("Deve criar um TvShow", async () => {
      const savedTvShow = tvShowSavedMock;
      jest
        .spyOn(
          TvShowRepository.prototype as any,
          "findByNameAndProductionCompany"
        )
        .mockResolvedValue(undefined);

      jest
        .spyOn(TvShowRepository.prototype as any, "save")
        .mockResolvedValue(savedTvShow);

      expect(await tvShowService.createTvShow(createtvShowMock)).toBe(
        savedTvShow
      );
    });

    it("Deve tentar criar um TvsShow já existente", async () => {
      jest
        .spyOn(
          TvShowRepository.prototype as any,
          "findByNameAndProductionCompany"
        )
        .mockResolvedValue(tvShowSavedMock);

      jest
        .spyOn(TvShowRepository.prototype as any, "save")
        .mockResolvedValue(tvShowSavedMock);

      try {
        await tvShowService.createTvShow(createtvShowMock);
      } catch (err) {
        expect(err.friendlyMessage).toBe("TvShow already exists!");
      }
    });
  });
});
