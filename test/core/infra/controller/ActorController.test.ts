import { CACHE_MANAGER } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { Response } from "express";
import { ClsService } from "nestjs-cls";
import ActorQuery from "src/modules/core/application/query/ActorQuery";
import { CreateActorUseCase } from "src/modules/core/application/usecases/CreateActorUseCase";
import { ActorController } from "src/modules/core/infra/controllers/Actor.controller";
import { ActorRepository } from "src/modules/core/infra/repository/impl/ActorRepository";
import { AuthInterceptor } from "src/shared/core/interceptors/Auth.interceptor";
import { createActorDTOMocks } from "test/mocks/core/ActorMocks";

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
  let actorController: ActorController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ActorController,
        {
          provide: ActorRepository,
          useValue: {},
        },
        {
          provide: CreateActorUseCase,
          useValue: {
            execute: jest.fn((x) => x),
          },
        },
        {
          provide: ActorQuery,
          useValue: {
            getActorDetails: jest.fn((x) => x),
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
    actorController = module.get<ActorController>(ActorController);
  });

  it("Deve ter o controller instanciado", () => {
    expect(actorController).toBeDefined();
  });

  describe("create", () => {
    it("deve criar um ator retornar 200", async () => {
      await actorController.create(responseMock, createActorDTOMocks);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.json).toHaveBeenCalled();
    });

    it("deve recuperar os detalhes e retornar 200", async () => {
      await actorController.showDetails(responseMock, "name");
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.json).toHaveBeenCalled();
    });
  });
});
