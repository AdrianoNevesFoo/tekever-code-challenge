import { Test } from "@nestjs/testing";
import * as nock from "nock";

import { RolesProvider } from "src/modules/auth/application/providers/Roles.provider";
import {
  getAllRolesFromRealmMock,
  getRoleByNameMock,
} from "test/mocks/auth/RolesMocks";
import { RealmMaster } from "src/modules/auth/RealmMaster.decorator";
import { clientCredentialsTokenResponseMock } from "test/mocks/auth/AccessTokenMocks";

describe("Cria nova conta", () => {
  let rolesProvider: RolesProvider;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [RolesProvider],
    }).compile();

    rolesProvider = module.get<RolesProvider>(RolesProvider);
  });

  it("Deve ter o useCase instanciado", () => {
    expect(RolesProvider).toBeDefined();
    expect(RealmMaster).toBeDefined();
  });

  describe("Tesete do RolerProvider", () => {
    it("Deve recuperar uma role pelo seu nome", async () => {
      const roleName = "USER";

      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const requestResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .get("/admin/realms/Teste/roles/USER")
        .reply(200, getRoleByNameMock);

      const resp = await rolesProvider.getRoleByName(roleName);

      expect(resp).toEqual(getRoleByNameMock);
    });

    it("Deve recuperar todas as roles de um realm", async () => {
      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const requestResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .get("/admin/realms/Teste/roles")
        .reply(200, getAllRolesFromRealmMock);

      const resp = await rolesProvider.getAllRolesForRealm();

      expect(resp).toEqual(getAllRolesFromRealmMock);
    });

    it("Deve adicionar uma role a um usuário", async () => {
      const userId = "e2566465-2a21-4e1f-81e0-fcb91a8d1484";

      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const requestResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .post(`/admin/realms/Teste/users/${userId}/role-mappings/realm`)
        .reply(200, "");

      expect(
        await rolesProvider.addRealmRoleToUser(userId, {
          id: "f7ed1bfa-86ec-4cf7-89c5-90e9d05b6ddc",
          name: "USER",
          description: "",
          composite: false,
          clientRole: false,
          containerId: "Teste",
        })
      ).toBe("");
    });

    it("Deve tentar autenticar como master no decorator RealmMaster", async () => {
      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(403);

      try {
        const resp = await rolesProvider.getAllRolesForRealm();
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Deve tentar recuperar todas as roles de um Realm", async () => {
      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const requestResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .get("/admin/realms/Teste/roles")
        .reply(400);

      try {
        const resp = await rolesProvider.getAllRolesForRealm();
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Deve tentar recuperar uma role pelo seu nome", async () => {
      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const requestResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .get("/admin/realms/Teste/roles/USER")
        .reply(400, getRoleByNameMock);

      try {
        const resp = await rolesProvider.getRoleByName("USER");
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Deve tentar recuperar uma role pelo seu nome retornando 404", async () => {
      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const requestResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .get("/admin/realms/Teste/roles/USER")
        .reply(404, getRoleByNameMock);

      try {
        const resp = await rolesProvider.getRoleByName("USER");
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });

    it("Deve tentar adicionar uma role a um usuário", async () => {
      const userId = "e2566465-2a21-4e1f-81e0-fcb91a8d1484";

      const realmMasterRequest = nock("https://keycloak-hml.lbsdigital.com.br")
        .post("/realms/master/protocol/openid-connect/token")
        .reply(200, clientCredentialsTokenResponseMock);

      const requestResult = nock("https://keycloak-hml.lbsdigital.com.br")
        .post(`/admin/realms/Teste/users/${userId}/role-mappings/realm`)
        .reply(400);

      try {
        await rolesProvider.addRealmRoleToUser(userId, {
          id: "f7ed1bfa-86ec-4cf7-89c5-90e9d05b6ddc",
          name: "USER",
          description: "",
          composite: false,
          clientRole: false,
          containerId: "Teste",
        });
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });
});
