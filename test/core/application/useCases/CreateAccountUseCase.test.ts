import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateAccountUseCase } from "src/modules/core/application/usecases/CreateAccountUseCase";
import { AccountRepository } from "src/modules/core/infra/repository/impl/AccountRepository";
import {
  accountSavedMock,
  createNewAccountMock,
} from "test/mocks/core/AccountMocks";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";

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

describe("Cria nova conta", () => {
  let createAccountUseCase: CreateAccountUseCase;
  let accountRepository: AccountRepository;
  let prismaRepository: PrismaRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateAccountUseCase,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
        AccountRepository,
        PrismaRepository,
      ],
    }).compile();
    createAccountUseCase =
      module.get<CreateAccountUseCase>(CreateAccountUseCase);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(createAccountUseCase).toBeDefined();
  });

  describe("Deve criar uma nova conta", () => {
    it("Deve criar uma nova conta", async () => {
      jest
        .spyOn(AccountRepository.prototype as any, "findByEmail")
        .mockResolvedValue(undefined);

      jest
        .spyOn(AccountRepository.prototype as any, "save")
        .mockResolvedValue(accountSavedMock);

      expect(await createAccountUseCase.execute(createNewAccountMock)).toBe(
        undefined
      );
    });

    it("Deve tentar criar uma conta com email já existente", async () => {
      jest
        .spyOn(AccountRepository.prototype as any, "findByEmail")
        .mockResolvedValue(accountSavedMock);

      jest
        .spyOn(AccountRepository.prototype as any, "save")
        .mockResolvedValue(accountSavedMock);

      try {
        await createAccountUseCase.execute(createNewAccountMock);
      } catch (err) {
        expect(err.friendlyMessage).toBe(
          "Já existe uma conta criada para o email ou chave passados como parâmetro."
        );
      }
    });
  });
});
