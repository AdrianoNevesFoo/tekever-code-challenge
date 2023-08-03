import { AccountDomain } from "src/modules/core/domain/entity/AccountDomain";
import { accountProps } from "test/mocks/core/AccountMocks";

describe("AccountDomain", () => {
  beforeEach(async () => {});

  describe("Teste AccountDomain", () => {
    test("Deve criar um AccountDomain", async () => {
      const domain = AccountDomain.create(accountProps);

      expect(domain.props.name).toEqual(accountProps.name);
    });

    test("Teste dos métodos get", async () => {
      const domain = AccountDomain.create(accountProps);

      expect(domain.name).toEqual(accountProps.name);
      expect(domain.email).toEqual(accountProps.email);
      expect(domain.verified).toEqual(accountProps.verified);
      expect(domain.userId).toEqual(accountProps.userId);
    });
  });
});
