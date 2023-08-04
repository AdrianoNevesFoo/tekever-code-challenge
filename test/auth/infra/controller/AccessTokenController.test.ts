import { Test } from "@nestjs/testing";
import { Response } from "express";
import { ClsService } from "nestjs-cls";
import { AccessTokenProvider } from "src/modules/auth/application/providers/AccessToken.provider";
import { GetTokenUseCase } from "src/modules/auth/application/usecases/GetTokenUsecase";
import { AccessTokenController } from "src/modules/auth/infra/controllers/AccessToken.controller";

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
  let accessTokenController: AccessTokenController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccessTokenController,
        {
          provide: AccessTokenProvider,
          useValue: {},
        },
        {
          provide: GetTokenUseCase,
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
      ],
    }).compile();
    accessTokenController = module.get<AccessTokenController>(
      AccessTokenController
    );
  });

  it("Deve ter o controller instanciado", () => {
    expect(accessTokenController).toBeDefined();
  });

  describe("changePassword", () => {
    it("deve chamar o changePassword e retornar 200", async () => {
      await accessTokenController.login(responseMock, {
        username: "test@test.com",
        password: "123abc",
      });
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.json).toHaveBeenCalled();
    });
  });
});
