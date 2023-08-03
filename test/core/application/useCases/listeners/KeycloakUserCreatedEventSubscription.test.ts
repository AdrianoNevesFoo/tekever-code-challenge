import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import KeycloakUserCreatedEventSubscription from "src/modules/core/application/listeners/KeycloakUserCreatedEventSubscription";
import { AccountRepository } from "src/modules/core/infra/repository/impl/AccountRepository";

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

describe("AccountCreatedEventSubscription", () => {
  let keycloakUserCreatedEventSubscription: KeycloakUserCreatedEventSubscription;
  let accountRepository: AccountRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        KeycloakUserCreatedEventSubscription,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
        AccountRepository,
        PrismaRepository,
      ],
    }).compile();
    keycloakUserCreatedEventSubscription =
      module.get<KeycloakUserCreatedEventSubscription>(
        KeycloakUserCreatedEventSubscription
      );
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  it("Deve estar instanciado", () => {
    expect(keycloakUserCreatedEventSubscription).toBeDefined();
    expect(accountRepository).toBeDefined();
  });

  describe("KeycloakUserCreatedEventSubscription", () => {
    it("deve executar o evento com sucesso", async () => {
      jest.spyOn(accountRepository, "update").mockResolvedValue({});

      expect(
        await keycloakUserCreatedEventSubscription.updateKeycloakUserIdOnAccount(
          {
            accountId: "f7ed1bfa-86ec-4cf7-89c5-90e9d05b6ddc",
            userId: "0bdabf9f-5b94-4f25-bc42-c314a64f32bb",
          }
        )
      ).toBe(undefined);
    });

    it("deve dar erro ao tentar executar o evento", async () => {
      jest
        .spyOn(accountRepository, "update")
        .mockRejectedValue(new Error("Async error message"));

      expect(
        await keycloakUserCreatedEventSubscription.updateKeycloakUserIdOnAccount(
          {
            accountId: "f7ed1bfa-86ec-4cf7-89c5-90e9d05b6ddc",
            userId: "0bdabf9f-5b94-4f25-bc42-c314a64f32bb",
          }
        )
      ).toBe(undefined);
    });
  });
});
