import { Test } from "@nestjs/testing";
import * as nock from "nock";
import { AccessTokenProvider } from "src/modules/auth/application/providers/AccessToken.provider";
import { passwordTokenResponseMock } from "test/mocks/auth/AccessTokenMocks";

describe("Cria nova conta", () => {
  let accessTokenProvider: AccessTokenProvider;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AccessTokenProvider],
    }).compile();
    accessTokenProvider = module.get<AccessTokenProvider>(AccessTokenProvider);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(AccessTokenProvider).toBeDefined();
  });

  describe("Tesete do AccessTokenProvider", () => {
    it("Deve recuperar um token através do método token", async () => {
      const requestResult = nock(
        "https://tekever-keycloak.labsmaisdigital.com.br"
      )
        .post("/realms/tekever/protocol/openid-connect/token")
        .reply(200, passwordTokenResponseMock);

      const resp = await accessTokenProvider.token({
        username: "fulano@email.com",
        password: "password",
      });

      expect(resp).toEqual(passwordTokenResponseMock);
    });

    it("Deve tentar recuperar um token através do método token", async () => {
      const requestResult = nock(
        "https://tekever-keycloak.labsmaisdigital.com.br"
      )
        .post("/realms/tekever/protocol/openid-connect/token")
        .reply(400, new Error("Erro ao recuperar token"));

      try {
        const resp = await accessTokenProvider.token({
          username: "fulano@email.com",
          password: "password",
        });
      } catch (err) {
        expect(err.friendlyMessage).toBe(
          "Não foi possível realizar o login. Verifique seu usuário e senha."
        );
      }
    });
  });
});
