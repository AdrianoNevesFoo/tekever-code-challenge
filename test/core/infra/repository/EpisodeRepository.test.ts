import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { MockContext, Context, createMockContext } from "../../../context";
import { BaseRepository } from "src/shared/core/Base.repository";
import { ActorDomain } from "src/modules/core/domain/entity/ActorDomain";
import { actorProps, actorSavedMock } from "test/mocks/core/ActorMocks";
import { faker } from "@faker-js/faker";
import { EpisodeRepository } from "src/modules/core/infra/repository/impl/EpisodeRepository";
import { EpisodeDomain } from "src/modules/core/domain/entity/EpisodeDomain";
import { episodeProps, episodeSavedMock } from "test/mocks/core/EpisodeMocks";

let mockCtx: MockContext;
let ctx: Context;

export class MockEventEmitter {
  private eventos = {};

  emit(key: string, payload: any) {
    this.eventos[key] = payload;
  }

  showEvents() {
    console.log(JSON.stringify(this.eventos));
  }

  getEvents() {
    return this.eventos;
  }
}

describe("EpisodeRepository", () => {
  let episodeRepository: EpisodeRepository;
  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const module = await Test.createTestingModule({
      providers: [
        EpisodeRepository,
        BaseRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
        PrismaRepository,
      ],
    }).compile();
    episodeRepository = module.get<EpisodeRepository>(EpisodeRepository);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(episodeRepository).toBeDefined();
  });

  describe("Teste da classe EpisodeRepository", () => {
    it("Deve criar uma nova conta", async () => {
      jest
        .spyOn(BaseRepository.prototype as any, "create")
        .mockResolvedValue(episodeSavedMock);

      const domain = EpisodeDomain.create(episodeProps);
      const result = await episodeRepository.save(domain);

      expect(result.id).toEqual(episodeSavedMock.id);
    });

    it("Find by name and tvShowId", async () => {
      jest.spyOn(episodeRepository, "create").mockResolvedValue(actorSavedMock);
      const result = await episodeRepository.findByNameAndTvShowId(
        faker.person.fullName(),
        faker.seed().toString()
      );
      expect(result).toBeUndefined();
    });
  });
});
