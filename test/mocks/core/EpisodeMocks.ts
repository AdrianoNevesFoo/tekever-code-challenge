import { faker } from "@faker-js/faker";

export const episodeProps = {
  name: faker.person.fullName(),
  number: 2,
  description: faker.lorem.sentence(),
  time: 1.2,
  season: 2,
  showId: faker.seed().toString(),
};

export const episodeSavedMock = {
  id: faker.seed().toString(),
  name: faker.person.fullName(),
  number: 5,
  description: faker.lorem.sentence(),
  time: 1.4,
  season: 6,
  showId: faker.seed().toString(),
  active: true,
  createdAt: faker.date.birthdate(),
  updatedAt: faker.date.birthdate(),
};
