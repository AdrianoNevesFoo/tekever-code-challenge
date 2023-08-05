import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { MockContext, Context, createMockContext } from "../../../context";
import { BaseRepository } from "src/shared/core/Base.repository";
import { ActorRepository } from "src/modules/core/infra/repository/impl/ActorRepository";
import { ActorDomain } from "src/modules/core/domain/entity/ActorDomain";
import { actorProps, actorSavedMock } from "test/mocks/core/ActorMocks";
import { faker } from "@faker-js/faker";

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

describe("ActorRepository", () => {
  let actorRepository: ActorRepository;
  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const module = await Test.createTestingModule({
      providers: [
        ActorRepository,
        BaseRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
        PrismaRepository,
      ],
    }).compile();
    actorRepository = module.get<ActorRepository>(ActorRepository);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(actorRepository).toBeDefined();
  });

  describe("Teste da classe AccountRepository", () => {
    it("Deve criar uma nova conta", async () => {
      jest
        .spyOn(BaseRepository.prototype as any, "create")
        .mockResolvedValue(actorSavedMock);

      const domain = ActorDomain.create(actorProps);
      const result = await actorRepository.save(domain);

      expect(result.id).toEqual(actorSavedMock.id);
    });

    it("Find by name and birthdate", async () => {
      mockCtx.prisma.actor.findFirst.mockResolvedValue(actorSavedMock);
      const result = await actorRepository.findByNameAndBirthdate(
        faker.person.fullName(),
        faker.date.birthdate().toString()
      );
      expect(result).toBeUndefined();
    });
  });
});
