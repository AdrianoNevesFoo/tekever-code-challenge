import { faker } from "@faker-js/faker";

export const personPropsMock = {
  name: faker.person.fullName(),
  cpf: "12345678911",
  rg: "11111111",
  addressMetadata: {},
  bankMetada: {},
  phones: [faker.phone.number()],
  emails: [faker.internet.email()],
  birthDate: "",
};
