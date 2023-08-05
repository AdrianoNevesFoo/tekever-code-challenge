import { faker } from "@faker-js/faker";

export const createtvShowMock = {
  name: faker.person.fullName(),
  releaseDate: faker.date.birthdate().toDateString(),
  endDate: faker.date.birthdate().toDateString(),
  productionCompany: faker.company.name(),
  country: "United States",
  genre: faker.lorem.word(),
  seasons: 4,
  actors: [faker.person.fullName()],
  episodes: [
    {
      name: faker.lorem.sentence(),
      number: 4,
      description: faker.lorem.sentence(),
      time: 3.4,
      season: 7,
    },
  ],
};

export const tvShowProps = {
  name: faker.person.fullName(),
  releaseDate: faker.date.birthdate().toDateString(),
  endDate: faker.date.birthdate().toDateString(),
  productionCompany: faker.company.name(),
  country: "United States",
  genre: faker.lorem.word(),
  seasons: 4,
  actors: [faker.person.fullName()],
};

export const tvShowSavedMock = {
  id: faker.seed().toString(),
  name: faker.person.fullName(),
  releaseDate: faker.date.birthdate().toDateString(),
  endDate: faker.date.birthdate().toDateString(),
  productionCompany: faker.company.name(),
  country: "United States",
  genre: faker.lorem.word(),
  seasons: 4,
  active: true,
  createdAt: faker.date.birthdate(),
  updatedAt: faker.date.birthdate(),
};
