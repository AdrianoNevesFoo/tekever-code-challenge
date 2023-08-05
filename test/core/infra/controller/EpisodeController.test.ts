import { CACHE_MANAGER } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { Response } from "express";
import { ClsService } from "nestjs-cls";
import { AssociateEpisodeUseCase } from "src/modules/core/application/usecases/AssociateEpisodeUseCase";
import { EpisodeController } from "src/modules/core/infra/controllers/Episode.controller";
import { EpisodeRepository } from "src/modules/core/infra/repository/impl/EpisodeRepository";
import { AuthInterceptor } from "src/shared/core/interceptors/Auth.interceptor";
import { episodeProps } from "test/mocks/core/EpisodeMocks";

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
  let episodeController: EpisodeController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EpisodeController,
        {
          provide: EpisodeRepository,
          useValue: {},
        },
        {
          provide: AssociateEpisodeUseCase,
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
    episodeController = module.get<EpisodeController>(EpisodeController);
  });

  it("Deve ter o controller instanciado", () => {
    expect(episodeController).toBeDefined();
  });

  describe("create", () => {
    it("deve criar um ator retornar 200", async () => {
      await episodeController.create(responseMock, episodeProps);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.json).toHaveBeenCalled();
    });
  });
});
