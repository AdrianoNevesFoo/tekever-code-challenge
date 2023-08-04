import { faker } from "@faker-js/faker";

export const createUserRequestMock = {
  email: "fulano@email.com",
  name: "Fulano de Tal",
  password: "123",
};

export const createUserResponseMock = {
  email: "fulano@email.com",
  name: "Fulano de Tal",
};

export const getUserByEmail = {
  id: "e2566465-2a21-4e1f-81e0-fcb91a8d1484",
  createdTimestamp: 1689028783536,
  username: "teste@email.com",
  enabled: true,
  totp: false,
  emailVerified: true,
  firstName: "Usuario",
  lastName: "Teste",
  email: "teste@email.com",
  disableableCredentialTypes: [],
  requiredActions: [],
  notBefore: 1689446513,
  access: {
    manageGroupMembership: true,
    view: true,
    mapRoles: true,
    impersonate: true,
    manage: true,
  },
};

export const IKeycloakUserMock = {
  id: faker.string.uuid(),
  username: faker.internet.email(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  firstName: faker.person.fullName(),
  lastName: "",
  enabled: true,
  attributes: {},
  emailVerified: true,
  requiredActions: [""],
  clientRoles: {},
  realmRoles: [""],
};
