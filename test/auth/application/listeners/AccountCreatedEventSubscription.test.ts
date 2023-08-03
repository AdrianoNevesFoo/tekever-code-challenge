import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateUserUseCase } from "src/modules/auth/application/usecases/CreateUserUseCase";
import { UserProvider } from "src/modules/auth/application/providers/User.provider";
import { createUserRequestMock } from "test/mocks/auth/UserMocks";
import { RolesProvider } from "src/modules/auth/application/providers/Roles.provider";
import { getUserRoleMock } from "test/mocks/auth/RolesMocks";
import AccountCreatedEventSubscription from "src/modules/auth/application/listenners/AccountCreatedEventSubscription";

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
  let accountCreatedEventSubscription: AccountCreatedEventSubscription;
  let createUserUseCase: CreateUserUseCase;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountCreatedEventSubscription,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
        CreateUserUseCase,
        UserProvider,
        {
          provide: RolesProvider,
          useValue: {
            getRoleByName: jest.fn().mockResolvedValue(getUserRoleMock),
            addRealmRoleToUser: jest.fn().mockResolvedValue(""),
          },
        },
      ],
    }).compile();
    accountCreatedEventSubscription =
      module.get<AccountCreatedEventSubscription>(
        AccountCreatedEventSubscription
      );
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it("Deve estar instanciado", () => {
    expect(accountCreatedEventSubscription).toBeDefined();
    expect(createUserUseCase).toBeDefined();
  });

  describe("AccountCreatedEventSubscription", () => {
    it("deve executar o evento com sucesso", async () => {
      jest.spyOn(createUserUseCase, "execute").mockResolvedValue();

      expect(
        await accountCreatedEventSubscription.onStudentEnrolled(
          createUserRequestMock
        )
      ).toBe(undefined);
    });

    it("deve dar erro ao tentar executar o evento", async () => {
      jest
        .spyOn(createUserUseCase, "execute")
        .mockRejectedValue(new Error("Async error message"));

      expect(
        await accountCreatedEventSubscription.onStudentEnrolled(
          createUserRequestMock
        )
      ).toBe(undefined);
    });
  });
});
