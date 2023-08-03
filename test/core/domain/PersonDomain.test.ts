import { PersonDomain } from "src/modules/core/domain/entity/PersonDomain";
import { personPropsMock } from "test/mocks/core/PersonMocks";

describe("PersonDomain", () => {
  beforeEach(async () => {});

  describe("Teste PersonDomain", () => {
    test("Deve criar um PersonDomain", async () => {
      const domain = PersonDomain.create(personPropsMock);

      expect(domain.props.name).toEqual(personPropsMock.name);
    });

    test("Teste dos métodos get", async () => {
      const domain = PersonDomain.create(personPropsMock);

      expect(domain.name).toEqual(personPropsMock.name);
      expect(domain.emails).toEqual(personPropsMock.emails);
      expect(domain.cpf).toEqual(personPropsMock.cpf);
      expect(domain.addressMetadata).toEqual(personPropsMock.addressMetadata);
      expect(domain.bankMetada).toEqual(personPropsMock.bankMetada);

      expect(domain.birthDate).toEqual(personPropsMock.birthDate);
      expect(domain.phones).toEqual(personPropsMock.phones);
      expect(domain.rg).toEqual(personPropsMock.rg);
    });
  });
});
