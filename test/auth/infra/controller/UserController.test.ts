import { CACHE_MANAGER } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { Response } from "express";
import { ClsService } from "nestjs-cls";
import { SetupNewPasswordUseCase } from "src/modules/auth/application/usecases/SetupNewPasswordUseCase";
import { UserController } from "src/modules/auth/infra/controllers/User.controller";
import { AuthInterceptor } from "src/shared/core/interceptors/Auth.interceptor";
import { setupNewPasswordMock } from "test/mocks/auth/UserControllerMocks";

const statusResponseMock = {
  send: jest.fn((x) => x),
  json: jest.fn((x) => x),
};
const responseMock = {
  status: jest.fn((x) => statusResponseMock),
  send: jest.fn((x) => x),
  sendStatus: jest.fn((x) => x),
  type: jest.fn((x) => x),
} as unknown as Response;

describe("", () => {
  let userController: UserController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserController,
        {
          provide: SetupNewPasswordUseCase,
          useValue: {
            execute: jest.fn((x) => x),
          },
        },
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
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
        {
          provide: AuthInterceptor,
          useValue: {},
        },
      ],
    }).compile();
    userController = module.get<UserController>(UserController);
  });

  it("Deve ter o controller instanciado", () => {
    expect(userController).toBeDefined();
  });

  describe("UserController", () => {
    it("deve setar um novo password para o usuário e retornar 200", async () => {
      await userController.setupNewPassword(responseMock, setupNewPasswordMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.json).toHaveBeenCalled();
    });
  });
});
