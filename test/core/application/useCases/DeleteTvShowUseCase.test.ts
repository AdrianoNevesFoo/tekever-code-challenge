import { Test } from "@nestjs/testing";
import { TvShowRepository } from "src/modules/core/infra/repository/impl/TvShowRepository";
import { DeleteTvShowUseCase } from "src/modules/core/application/usecases/DeleteTvShowUseCase";
import { EpisodeRepository } from "src/modules/core/infra/repository/impl/EpisodeRepository";
import { ActorsOnTvShowRepository } from "src/modules/core/infra/repository/impl/ActorsOnTvShowRepository";
import { episodeSavedMock } from "test/mocks/core/EpisodeMocks";
import { actorsOnTvShowMock } from "test/mocks/core/ActorMocks";
import { faker } from "@faker-js/faker";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MockEventEmitter } from "test/mocks/EventEmitterMock";

describe("Delete TvShow", () => {
  let deleteTvShowUseCase: DeleteTvShowUseCase;
  let tvShowRepository: TvShowRepository;
  let episodeRepository: EpisodeRepository;
  let actorsOnTvShowRepository: ActorsOnTvShowRepository;
  let prismaRepository: PrismaRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteTvShowUseCase,
        TvShowRepository,
        EpisodeRepository,
        ActorsOnTvShowRepository,
        PrismaRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
      ],
    }).compile();
    deleteTvShowUseCase = module.get<DeleteTvShowUseCase>(DeleteTvShowUseCase);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(DeleteTvShowUseCase).toBeDefined();
  });

  describe("Deve deletar um TvShow", () => {
    it("Deve deletar um TvShow", async () => {
      jest
        .spyOn(EpisodeRepository.prototype as any, "findAll")
        .mockResolvedValue([episodeSavedMock]);
      jest
        .spyOn(EpisodeRepository.prototype as any, "deleteMany")
        .mockResolvedValue(undefined);
      jest
        .spyOn(TvShowRepository.prototype as any, "delete")
        .mockResolvedValue(undefined);
      jest
        .spyOn(ActorsOnTvShowRepository.prototype as any, "findAll")
        .mockResolvedValue([actorsOnTvShowMock]);
      jest
        .spyOn(ActorsOnTvShowRepository.prototype as any, "delete")
        .mockResolvedValue(undefined);

      expect(await deleteTvShowUseCase.execute(faker.seed().toString())).toBe(
        undefined
      );
    });
  });
});
