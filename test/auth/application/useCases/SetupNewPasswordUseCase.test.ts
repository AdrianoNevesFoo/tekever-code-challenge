import { Test } from "@nestjs/testing";
import { UserProvider } from "src/modules/auth/application/providers/User.provider";
import { IKeycloakUserMock } from "test/mocks/auth/UserMocks";

import { SetupNewPasswordUseCase } from "src/modules/auth/application/usecases/SetupNewPasswordUseCase";
import { ClsService } from "nestjs-cls";
import { passwordTokenResponseMock } from "test/mocks/auth/AccessTokenMocks";

export class MockClsService {
  private variable = {};
  get(key: string) {
    return "newPassword";
  }

  set(key: string, value: string) {
    this.variable[key] = value;
  }
}

describe("Cria nova conta", () => {
  let setupNewPasswordUseCase: SetupNewPasswordUseCase;
  let userProvider: UserProvider;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SetupNewPasswordUseCase,
        UserProvider,
        {
          provide: ClsService,
          useValue: {
            set: jest.fn((x) => x),
            get: jest.fn((x) => x),
            has: jest.fn((x) => x),
            getId: jest.fn((x) => x),
            run: jest.fn((x) => x),
            runWith: jest.fn((x) => x),
            enter: jest.fn((x) => x),
            enterWith: jest.fn((x) => x),
            exit: jest.fn((x) => x),
            isActive: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    userProvider = module.get<UserProvider>(UserProvider);
    setupNewPasswordUseCase = module.get<SetupNewPasswordUseCase>(
      SetupNewPasswordUseCase
    );
  });

  it("Deve ter o useCase instanciado", () => {
    expect(userProvider).toBeDefined();
    expect(userProvider).toBeDefined();
  });

  describe("Tesete caso de uso SetupNewPasswordUseCase", () => {
    it("Deve setar um novo password a um usuário", async () => {
      jest
        .spyOn(ClsService.prototype as any, "get")
        .mockImplementation(() => "newPassword");

      jest
        .spyOn(userProvider, "getUserByEmail")
        .mockResolvedValue(IKeycloakUserMock);
      jest
        .spyOn(userProvider, "setUpNewPassword")
        .mockResolvedValue(passwordTokenResponseMock);

      expect(await setupNewPasswordUseCase.execute("password")).toBe(undefined);
    });
  });
});
