import { Test } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GetTokenUseCase } from "src/modules/auth/application/usecases/GetTokenUsecase";
import {
  clientCredentialsTokenMock,
  clientCredentialsTokenResponseMock,
  passwordTokenMock,
  passwordTokenResponseMock,
} from "test/mocks/auth/AccessTokenMocks";
import { AccessTokenProvider } from "src/modules/auth/application/providers/AccessToken.provider";

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

describe("Carregando contexto para GetTokenUseCase", () => {
  let getTokenUseCase: GetTokenUseCase;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetTokenUseCase,
        {
          provide: EventEmitter2,
          useValue: new MockEventEmitter(),
        },
        {
          provide: AccessTokenProvider,
          useValue: {
            token: jest.fn().mockResolvedValue(passwordTokenResponseMock),
            clientCredentials: jest
              .fn()
              .mockResolvedValue(clientCredentialsTokenResponseMock),
          },
        },
      ],
    }).compile();
    getTokenUseCase = module.get<GetTokenUseCase>(GetTokenUseCase);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(getTokenUseCase).toBeDefined();
  });

  describe("Tesete caso de uso GetTokenUseCase", () => {
    it("Deve pegar um token do tipo password", async () => {
      const result = await getTokenUseCase.execute(passwordTokenMock);
      expect(result).toEqual(passwordTokenResponseMock);
    });
  });
});
