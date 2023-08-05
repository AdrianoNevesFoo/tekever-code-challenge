import { faker } from "@faker-js/faker";
import { tvShowProps } from "./TvShowMocks";

export const actorProps = {
  name: faker.person.fullName(),
  age: 30,
  birthDate: faker.date.birthdate().toDateString(),
  country: "United States",
  tvShows: [],
};

export const actorSavedMock = {
  id: faker.seed().toString(),
  name: faker.person.fullName(),
  age: 60,
  country: "United States",
  birthDate: faker.date.birthdate().toDateString(),
  active: true,
  createdAt: faker.date.birthdate(),
  updatedAt: faker.date.birthdate(),
};

export const createActorMocks = {
  name: faker.person.fullName(),
  age: 60,
  country: "United States",
  birthDate: faker.date.birthdate().toDateString(),
  tvShows: [faker.seed().toString()],
};

export const createActorDTOMocks = {
  name: faker.person.fullName(),
  age: 60,
  country: "United States",
  birthDate: faker.date.birthdate(),
  tvShows: [],
};

export const actorsOnTvShowMock = {
  showId: faker.seed().toString(),
  actorId: faker.seed().toString(),
  active: true,
  createdAt: faker.date.birthdate(),
  updatedAt: faker.date.birthdate(),
};
