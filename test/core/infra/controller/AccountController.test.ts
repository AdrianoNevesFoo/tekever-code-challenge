import { CACHE_MANAGER } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { Response } from "express";
import { ClsService } from "nestjs-cls";
import { CreateAccountUseCase } from "src/modules/core/application/usecases/CreateAccountUseCase";
import { AccountController } from "src/modules/core/infra/controllers/Account.controller";
import { AccountRepository } from "src/modules/core/infra/repository/impl/AccountRepository";
import { AuthInterceptor } from "src/shared/core/interceptors/Auth.interceptor";
import { createNewAccountMock } from "test/mocks/core/AccountMocks";

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
  let accountController: AccountController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountController,
        {
          provide: AccountRepository,
          useValue: {},
        },
        {
          provide: CreateAccountUseCase,
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
    accountController = module.get<AccountController>(AccountController);
  });

  it("Deve ter o controller instanciado", () => {
    expect(accountController).toBeDefined();
  });

  describe("create", () => {
    it("deve atualizar um account e retornar 200", async () => {
      await accountController.create(responseMock, createNewAccountMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.json).toHaveBeenCalled();
    });
  });
});
