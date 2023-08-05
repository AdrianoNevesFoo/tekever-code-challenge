import { Test } from "@nestjs/testing";
import { episodeProps, episodeSavedMock } from "test/mocks/core/EpisodeMocks";
import { ActorRepository } from "src/modules/core/infra/repository/impl/ActorRepository";
import { TvShowRepository } from "src/modules/core/infra/repository/impl/TvShowRepository";
import { CreateActorUseCase } from "src/modules/core/application/usecases/CreateActorUseCase";
import { actorSavedMock, createActorMocks } from "test/mocks/core/ActorMocks";
import { tvShowSavedMock } from "test/mocks/core/TvShowMocks";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MockEventEmitter } from "test/mocks/EventEmitterMock";

describe("Create Actor", () => {
  let createActorUseCase: CreateActorUseCase;
  let actorRepository: ActorRepository;
  let tvShowRepository: TvShowRepository;
  let prismaRepository: PrismaRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateActorUseCase,
        ActorRepository,
        TvShowRepository,
        PrismaRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
      ],
    }).compile();
    createActorUseCase = module.get<CreateActorUseCase>(CreateActorUseCase);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(CreateActorUseCase).toBeDefined();
  });

  describe("Deve criar um ator", () => {
    it("Deve criar um ator", async () => {
      const savedActor = actorSavedMock;
      jest
        .spyOn(ActorRepository.prototype as any, "findByNameAndBirthdate")
        .mockResolvedValue(undefined);
      jest
        .spyOn(ActorRepository.prototype as any, "save")
        .mockResolvedValue(savedActor);

      jest
        .spyOn(TvShowRepository.prototype as any, "findAll")
        .mockResolvedValue([tvShowSavedMock]);

      expect(await createActorUseCase.execute(createActorMocks)).toBe(
        savedActor
      );
    });

    it("Deve tentar criar um ator já existente", async () => {
      jest
        .spyOn(ActorRepository.prototype as any, "findByNameAndBirthdate")
        .mockResolvedValue(actorSavedMock);
      jest
        .spyOn(ActorRepository.prototype as any, "save")
        .mockResolvedValue(actorSavedMock);

      jest
        .spyOn(TvShowRepository.prototype as any, "findAll")
        .mockResolvedValue([tvShowSavedMock]);

      try {
        await createActorUseCase.execute(createActorMocks);
      } catch (err) {
        expect(err.friendlyMessage).toBe("Actor already exists!");
      }
    });
  });
});
