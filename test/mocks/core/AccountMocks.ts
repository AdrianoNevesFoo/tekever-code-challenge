import { AccountType } from "@prisma/client";
import { AccountTypeEnum } from "src/shared/core/enums/AccountTypeEnum";
import { faker } from "@faker-js/faker";

export const createNewAccountMock = {
  name: "Fulano de Tal",
  email: "fulano@gmail.com",
  password: "123",
  accountType: AccountTypeEnum.USER,
};

export const accountSavedMock = {
  id: "f7ed1bfa-86ec-4cf7-89c5-90e9d05b6ddc",
  name: "Fulano de Tal",
  email: "fulano@email.com",
  verified: true,
  userId: "f7ed1bfa-86ec-4cf7-89c5-90e9d05b6ddc",
  accountType: AccountType.USER,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const accountSavedMockList = [
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    verified: true,
    userId: faker.string.uuid(),
    accountType: AccountType.USER,
    active: true,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  },
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    verified: true,
    userId: faker.string.uuid(),
    accountType: AccountType.USER,
    active: true,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  },
];

export const accountProps = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  verified: true,
  userId: faker.string.uuid(),
};
