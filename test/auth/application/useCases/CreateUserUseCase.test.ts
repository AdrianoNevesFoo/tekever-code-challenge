import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateUserUseCase } from "src/modules/auth/application/usecases/CreateUserUseCase";
import { UserProvider } from "src/modules/auth/application/providers/User.provider";
import {
  createUserRequestMock,
  createUserResponseMock,
} from "test/mocks/auth/UserMocks";
import { RolesProvider } from "src/modules/auth/application/providers/Roles.provider";
import { getUserRoleMock } from "test/mocks/auth/RolesMocks";

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
  let createUserUseCase: CreateUserUseCase;
  let userProvider: UserProvider;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
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
    userProvider = module.get<UserProvider>(UserProvider);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(userProvider).toBeDefined();
    expect(createUserUseCase).toBeDefined();
  });

  describe("Tesete caso de uso CreateUserUseCase", () => {
    it("Deve criar um usuário", async () => {
      jest
        .spyOn(userProvider, "create")
        .mockResolvedValue(createUserResponseMock);

      expect(await createUserUseCase.execute(createUserRequestMock)).toBe(
        undefined
      );
    });

    it("Deve tentar criar um usuário", async () => {
      jest
        .spyOn(userProvider, "create")
        .mockRejectedValue(new Error("Async error message"));

      expect(await createUserUseCase.execute(createUserRequestMock)).toBe(
        undefined
      );
    });
  });
});
