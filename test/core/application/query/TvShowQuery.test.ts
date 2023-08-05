import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { faker } from "@faker-js/faker";
import TvShowQuery from "src/modules/core/application/query/TvShowQuery";
import { TvShowRepository } from "src/modules/core/infra/repository/impl/TvShowRepository";
import { tvShowSavedMock } from "test/mocks/core/TvShowMocks";

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

describe("TvShowQuery", () => {
  let tvShowQuery: TvShowQuery;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TvShowQuery,
        TvShowRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
        PrismaRepository,
      ],
    }).compile();
    tvShowQuery = module.get<TvShowQuery>(TvShowQuery);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(tvShowQuery).toBeDefined();
  });

  describe("Teste da classe TvShowQuery", () => {
    it("Get TvShow Details", async () => {
      const foundList = [tvShowSavedMock];
      jest
        .spyOn(TvShowRepository.prototype as any, "findAll")
        .mockResolvedValue(foundList);

      const result = await tvShowQuery.getTvShowDetails(
        faker.person.fullName()
      );

      expect(result?.length).toEqual(foundList.length);
    });
  });
});
