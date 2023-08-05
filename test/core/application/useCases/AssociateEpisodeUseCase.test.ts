import { Test } from "@nestjs/testing";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { AssociateEpisodeUseCase } from "src/modules/core/application/usecases/AssociateEpisodeUseCase";
import { EpisodeRepository } from "src/modules/core/infra/repository/impl/EpisodeRepository";
import { episodeProps, episodeSavedMock } from "test/mocks/core/EpisodeMocks";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MockEventEmitter } from "test/mocks/EventEmitterMock";

describe("Associate episode", () => {
  let associateEpisodeUseCase: AssociateEpisodeUseCase;
  let episodeRepository: EpisodeRepository;
  let prismaRepository: PrismaRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AssociateEpisodeUseCase,
        EpisodeRepository,
        PrismaRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
      ],
    }).compile();
    associateEpisodeUseCase = module.get<AssociateEpisodeUseCase>(
      AssociateEpisodeUseCase
    );
  });

  it("Deve ter o useCase instanciado", () => {
    expect(AssociateEpisodeUseCase).toBeDefined();
  });

  describe("Deve associar um episodio", () => {
    it("Deve associar um episodio", async () => {
      const savedEpisode = episodeSavedMock;
      jest
        .spyOn(EpisodeRepository.prototype as any, "findByNameAndTvShowId")
        .mockResolvedValue(undefined);

      jest
        .spyOn(EpisodeRepository.prototype as any, "save")
        .mockResolvedValue(savedEpisode);

      expect(await associateEpisodeUseCase.execute(episodeProps)).toBe(
        savedEpisode
      );
    });

    it("Deve tentar criar um episodio já existente", async () => {
      jest
        .spyOn(EpisodeRepository.prototype as any, "findByNameAndTvShowId")
        .mockResolvedValue(episodeSavedMock);

      jest
        .spyOn(EpisodeRepository.prototype as any, "save")
        .mockResolvedValue(episodeSavedMock);

      try {
        await associateEpisodeUseCase.execute(episodeProps);
      } catch (err) {
        expect(err.friendlyMessage).toBe(
          "Episode already associated to this Tv Show."
        );
      }
    });
  });
});
