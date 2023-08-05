import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { MockContext, Context, createMockContext } from "../../../context";
import ActorQuery from "src/modules/core/application/query/ActorQuery";
import { ActorRepository } from "src/modules/core/infra/repository/impl/ActorRepository";
import { actorSavedMock } from "test/mocks/core/ActorMocks";
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

describe("ActorQuery", () => {
  let actorQuery: ActorQuery;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ActorQuery,
        ActorRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
        PrismaRepository,
      ],
    }).compile();
    actorQuery = module.get<ActorQuery>(ActorQuery);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(actorQuery).toBeDefined();
  });

  describe("Teste da classe ActorQuery", () => {
    it("Get actor Details", async () => {
      const foundList = [actorSavedMock];
      jest
        .spyOn(ActorRepository.prototype as any, "findAll")
        .mockResolvedValue(foundList);

      const result = await actorQuery.getActorDetails(faker.person.fullName());

      expect(result?.length).toEqual(foundList.length);
    });
  });
});
