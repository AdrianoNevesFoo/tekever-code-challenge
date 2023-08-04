import { Test } from "@nestjs/testing";
import * as nock from "nock";
import { RealmMaster } from "src/modules/auth/RealmMaster.decorator";
import { UserProvider } from "src/modules/auth/application/providers/User.provider";
import { clientCredentialsTokenResponseMock } from "test/mocks/auth/AccessTokenMocks";
import {
  createUserRequestMock,
  createUserResponseMock,
} from "test/mocks/auth/UserMocks";

describe("Cria nova conta", () => {
  let userProvider: UserProvider;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserProvider],
    }).compile();

    userProvider = module.get<UserProvider>(UserProvider);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(UserProvider).toBeDefined();
    expect(RealmMaster).toBeDefined();
  });

  describe("Tesete do UserProvider", () => {
    it("Deve criar um usuário", async () => {
      const roleName = "USER";

      const realmMasterRequest = nock(
        "https://tekever-keycloak.labsmaisdigital.com.br"
      )
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const createUserResult = nock(
        "https://tekever-keycloak.labsmaisdigital.com.br"
      )
        .post("/admin/realms/tekever/users")
        .reply(200, createUserResponseMock);

      const resp = await userProvider.create(createUserRequestMock);
      expect(resp).toEqual(createUserResponseMock);
    });

    it("Deve tentar criar um usuário", async () => {
      const realmMasterRequest = nock(
        "https://tekever-keycloak.labsmaisdigital.com.br"
      )
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const createUserResult = nock(
        "https://tekever-keycloak.labsmaisdigital.com.br"
      )
        .post("/admin/realms/tekever/users")
        .reply(400);

      try {
        const resp = await userProvider.create(createUserRequestMock);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Deve buscara um usuário pelo seu email", async () => {
      const email = "fulano@email.com";

      const realmMasterRequest = nock(
        "https://tekever-keycloak.labsmaisdigital.com.br"
      )
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const logoutUserResult = nock(
        "https://tekever-keycloak.labsmaisdigital.com.br"
      )
        .get(`/admin/realms/tekever/users`)
        .query({ email: "fulano@email.com" })
        .reply(200);

      expect(await userProvider.getUserByEmail(email)).toBe(undefined);
    });

    it("Deve tentar recuperar um usuário pelo seu email", async () => {
      const email = "fulano@email.com";
      const userId = "e2566465-2a21-4e1f-81e0-fcb91a8d1484";
      const realmMasterRequest = nock(
        "https://tekever-keycloak.labsmaisdigital.com.br"
      )
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const logoutUserResult = nock(
        "https://tekever-keycloak.labsmaisdigital.com.br"
      )
        .get(`/admin/realms/tekever/users`)
        .query({ email: "fulano@email.com" })
        .reply(400);

      try {
        const resp = await userProvider.getUserByEmail(email);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Deve tentar autenticar como master no decorator RealmMaster", async () => {
      const email = "fulano@email.com";
      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(403);

      try {
        const resp = await userProvider.getUserByEmail(email);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });
});
