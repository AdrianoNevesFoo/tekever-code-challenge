import { Test } from "@nestjs/testing";
import { TvShowRepository } from "src/modules/core/infra/repository/impl/TvShowRepository";
import { createtvShowMock, tvShowSavedMock } from "test/mocks/core/TvShowMocks";
import { CreateTvShowUseCase } from "src/modules/core/application/usecases/CreateTvShowUseCase";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MockEventEmitter } from "test/mocks/EventEmitterMock";

describe("Create TvShow", () => {
  let createTvShowUseCase: CreateTvShowUseCase;
  let tvShowRepository: TvShowRepository;
  let prismaRepository: PrismaRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateTvShowUseCase,
        TvShowRepository,
        PrismaRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
      ],
    }).compile();
    createTvShowUseCase = module.get<CreateTvShowUseCase>(CreateTvShowUseCase);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(CreateTvShowUseCase).toBeDefined();
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

      expect(await createTvShowUseCase.execute(createtvShowMock)).toBe(
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
        await createTvShowUseCase.execute(createtvShowMock);
      } catch (err) {
        expect(err.friendlyMessage).toBe("TvShow already exists!");
      }
    });
  });
});
