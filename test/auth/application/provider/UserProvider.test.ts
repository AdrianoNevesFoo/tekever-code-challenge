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

  describe("Tesete do RolerProvider", () => {
    it("Deve criar um usuário", async () => {
      const roleName = "USER";

      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const createUserResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/admin/realms/Teste/users")
        .reply(200, createUserResponseMock);

      const resp = await userProvider.create(createUserRequestMock);
      expect(resp).toEqual(createUserRequestMock);
    });

    it("Deve tentar criar um usuário", async () => {
      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const createUserResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/admin/realms/Teste/users")
        .reply(400);

      try {
        const resp = await userProvider.create(createUserRequestMock);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Deve fazer logout de um usuário", async () => {
      const userId = "e2566465-2a21-4e1f-81e0-fcb91a8d1484";

      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const logoutUserResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .post(`/admin/realms/Teste/users/${userId}/logout`)
        .reply(204);

      expect(
        await userProvider.logoutUser({
          realm: "Teste",
          userId,
        })
      ).toBe("");
    });

    it("Deve tentar fazer logout de um usuário", async () => {
      const userId = "e2566465-2a21-4e1f-81e0-fcb91a8d1484";
      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const logoutUserResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .post(`/admin/realms/Teste/users/${userId}/logout`)
        .reply(400);

      try {
        const resp = await userProvider.logoutUser({
          realm: "Teste",
          userId,
        });
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Deve trocar a senha de um usuário", async () => {
      const userId = "e2566465-2a21-4e1f-81e0-fcb91a8d1484";

      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const logoutUserResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .put(`/admin/realms/Teste/users/${userId}/reset-password`)
        .reply(200);

      expect(
        await userProvider.setUpNewPassword({
          newPassword: "newPassword",
          userId,
        })
      ).toBe("");
    });

    it("Deve tentar trocar a senha de um usuário", async () => {
      const userId = "e2566465-2a21-4e1f-81e0-fcb91a8d1484";
      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const logoutUserResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .put(`/admin/realms/Teste/users/${userId}/reset-password`)
        .reply(400);

      try {
        const resp = await userProvider.setUpNewPassword({
          newPassword: "newPassword",
          userId,
        });
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Deve buscara um usuário pelo seu email", async () => {
      const email = "fulano@email.com";

      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const logoutUserResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .get(`/admin/realms/Teste/users`)
        .query({ email: "fulano@email.com" })
        .reply(200);

      expect(await userProvider.getUserByEmail(email)).toBe(undefined);
    });

    it("Deve tentar recuperar um usuário pelo seu email", async () => {
      const email = "fulano@email.com";
      const userId = "e2566465-2a21-4e1f-81e0-fcb91a8d1484";
      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const logoutUserResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .get(`/admin/realms/Teste/users`)
        .query({ email: "fulano@email.com" })
        .reply(400);

      try {
        const resp = await userProvider.getUserByEmail(email);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });
});
