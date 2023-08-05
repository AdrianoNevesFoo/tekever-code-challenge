import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { MockContext, Context, createMockContext } from "../../../context";
import { BaseRepository } from "src/shared/core/Base.repository";
import { ActorRepository } from "src/modules/core/infra/repository/impl/ActorRepository";
import { ActorDomain } from "src/modules/core/domain/entity/ActorDomain";
import { actorProps, actorSavedMock } from "test/mocks/core/ActorMocks";
import { faker } from "@faker-js/faker";
import { TvShowRepository } from "src/modules/core/infra/repository/impl/TvShowRepository";
import { TvShowDomain } from "src/modules/core/domain/entity/TvShowDomain";
import { tvShowProps, tvShowSavedMock } from "test/mocks/core/TvShowMocks";

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

describe("TvShowRepository", () => {
  let tvShowRepository: TvShowRepository;
  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const module = await Test.createTestingModule({
      providers: [
        TvShowRepository,
        BaseRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
        PrismaRepository,
      ],
    }).compile();
    tvShowRepository = module.get<TvShowRepository>(TvShowRepository);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(tvShowRepository).toBeDefined();
  });

  describe("Teste da classe AccountRepository", () => {
    it("Deve criar um novo tv show", async () => {
      jest
        .spyOn(BaseRepository.prototype as any, "create")
        .mockResolvedValue(tvShowSavedMock);

      const domain = TvShowDomain.create(tvShowProps);
      const result = await tvShowRepository.save(domain);

      expect(result.id).toEqual(tvShowSavedMock.id);
    });

    it("Find by name and production company", async () => {
      mockCtx.prisma.tvShow.findFirst.mockResolvedValue(tvShowSavedMock);
      const result = await tvShowRepository.findByNameAndProductionCompany(
        faker.person.fullName(),
        faker.date.birthdate().toString()
      );
      expect(result).toBeUndefined();
    });
  });
});
