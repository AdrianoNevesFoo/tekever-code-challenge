import { Entity } from "src/shared/domain/Entity";
import { BasePropsInterface } from "src/shared/domain/entity/BaseProps.interface";

export interface AccountProps extends BasePropsInterface {
  name: string;
  email: string;
  verified: boolean;
  userId?: string;
}

export class AccountDomain extends Entity<AccountProps> {
  private constructor(props: AccountProps, id?: string) {
    super(props, id);
  }

  static create(props: AccountProps, id?: string) {
    const account = new AccountDomain(props, id);
    return account;
  }

  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email;
  }
  get verified(): boolean {
    return this.props.verified;
  }
  get userId(): string | undefined {
    return this.props.userId;
  }
}
