import { faker } from "@faker-js/faker";
import { CACHE_MANAGER } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { Response } from "express";
import { ClsService } from "nestjs-cls";
import TvShowQuery from "src/modules/core/application/query/TvShowQuery";
import { TvShowService } from "src/modules/core/application/services/Tvshow.service";
import { DeleteTvShowUseCase } from "src/modules/core/application/usecases/DeleteTvShowUseCase";
import { TvShowController } from "src/modules/core/infra/controllers/TvShow.controller";
import { TvShowRepository } from "src/modules/core/infra/repository/impl/TvShowRepository";
import { AuthInterceptor } from "src/shared/core/interceptors/Auth.interceptor";
import { createtvShowMock } from "test/mocks/core/TvShowMocks";

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
  let tvShowController: TvShowController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TvShowController,
        {
          provide: TvShowRepository,
          useValue: {},
        },
        {
          provide: TvShowService,
          useValue: {
            createTvShow: jest.fn((x) => x),
          },
        },
        {
          provide: DeleteTvShowUseCase,
          useValue: {
            execute: jest.fn((x) => x),
          },
        },
        {
          provide: TvShowQuery,
          useValue: {
            getTvShowDetails: jest.fn((x) => x),
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
    tvShowController = module.get<TvShowController>(TvShowController);
  });

  it("Deve ter o controller instanciado", () => {
    expect(tvShowController).toBeDefined();
  });

  describe("create", () => {
    it("deve criar um tvshow retornar 200", async () => {
      await tvShowController.create(responseMock, createtvShowMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.json).toHaveBeenCalled();
    });

    it("deve recuperar os detalhes e retornar 200", async () => {
      await tvShowController.showDetails(responseMock, "name");
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.json).toHaveBeenCalled();
    });

    it("deve deletar um tvshow e retornar 200", async () => {
      await tvShowController.delete(responseMock, {
        id: faker.seed().toString(),
      });
      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(statusResponseMock.json).toHaveBeenCalled();
    });
  });
});
