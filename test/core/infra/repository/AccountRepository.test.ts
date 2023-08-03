import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { accountProps, accountSavedMock } from "test/mocks/core/AccountMocks";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { AccountDomain } from "src/modules/tvShows/domain/entity/AccountDomain";

import { MockContext, Context, createMockContext } from "../../../context";
import { AccountRepository } from "src/modules/core/infra/repository/impl/AccountRepository";
import { BaseRepository } from "src/shared/core/Base.repository";

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

describe("AccountRepository", () => {
  let accountRepository: AccountRepository;
  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const module = await Test.createTestingModule({
      providers: [
        AccountRepository,
        BaseRepository,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
        PrismaRepository,
      ],
    }).compile();
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(accountRepository).toBeDefined();
  });

  describe("Teste da classe AccountRepository", () => {
    it("Deve criar uma nova conta", async () => {
      jest
        .spyOn(BaseRepository.prototype as any, "create")
        .mockResolvedValue(accountSavedMock);

      const domain = AccountDomain.create(accountProps);
      const result = await accountRepository.save(domain);

      expect(result.id).toEqual(accountSavedMock.id);
    });

    // it("Deve recuperar uma conta pelo email", async () => {
    //   mockCtx.prisma.account.findFirst.mockResolvedValue(accountSavedMock);
    //   const result = await accountRepository.findByEmail(
    //     accountSavedMock.email
    //   );
    //   expect(result).toBeUndefined();
    // });

    it("Deve tentar recuperar uma conta pelo email", async () => {
      mockCtx.prisma.account.findFirst.mockResolvedValue(accountSavedMock);
      const result = await accountRepository.findByEmail("");
      expect(result).toBeUndefined();
    });
  });
});
