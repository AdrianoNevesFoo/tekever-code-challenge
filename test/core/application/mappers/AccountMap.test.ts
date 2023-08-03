import { AccountDomain } from "src/modules/tvShows/domain/entity/AccountDomain";
import { faker } from "@faker-js/faker";
import { AccountMapper } from "src/modules/core/application/mappers/AccountMap";
import {
  accountSavedMock,
  accountSavedMockList,
} from "test/mocks/core/AccountMocks";

describe("AccountMap", () => {
  const accountProps = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    verified: true,
    userId: faker.string.uuid(),
  };

  beforeEach(async () => {});

  describe("Teste AccountMapper", () => {
    test("Testa o método toPersistence", async () => {
      const domain = AccountDomain.create(accountProps);

      const accountDb = AccountMapper.toPersistence(domain);

      expect(accountDb.id).toBeTruthy();
    });

    test("Testa o método toDoamin", async () => {
      const accountDomain = AccountMapper.toDomain(accountSavedMock);
      expect(accountDomain._id).toBeTruthy();
    });

    test("Testa o método toDoaminList", async () => {
      const accountDomainList =
        AccountMapper.toDomainList(accountSavedMockList);
      expect(accountDomainList).toHaveLength(accountSavedMockList.length);
    });

    test("Testa o método toDoaminList passando uma lista vazia", async () => {
      const accountDomainList = AccountMapper.toDomainList([]);
      expect(accountDomainList).toHaveLength(0);
    });
  });
});
