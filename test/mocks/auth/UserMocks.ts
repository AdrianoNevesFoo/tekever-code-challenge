import { faker } from "@faker-js/faker";

export let createUserResponseMock = {
  accountId: "64b184b6c36d2efdf4f17237",
  email: "fulanodetal@gmail.com",
  firstName: "Fulano De Tal",
  id: "7d53faa1-2d8d-46d0-8f0e-9a201f1a493a",
  lastName: "",
  role: "USER",
  username: "fulanodetal@gmail.com",
};

export const createUserRequestMock = {
  username: "Fulano de Tal",
  email: "fulano@email.com",
  firstName: "Fulano de Tal",
  lastName: "",
  password: "123",
  accountId: "64b184b6c36d2efdf4f17237",
  role: "USER",
  verified: true,
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
