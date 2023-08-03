import { Entity } from "src/shared/domain/Entity";

export interface IAuditHistory {
  updatedBy: string;
  updatedAt: string;
  data?: any;
}
export interface AuditProps {
  entityId: string;
  entityName: string;
  history?: any;
}

export class AuditDomain {
  public readonly props: any;
  private constructor(props: AuditProps) {
    this.props = props;
  }

  static create(props: AuditProps) {
    const account = new AuditDomain(props);
    return account;
  }

  get entityId(): string {
    return this.props.entityId;
  }

  get entityName(): string {
    return this.props.entityName;
  }

  get history(): IAuditHistory[] | undefined {
    return this.props.history;
  }

  public addAuditHistory(audit: IAuditHistory | undefined) {
    if (!audit) return;
    if (!this.props.history) {
      this.props.history = [];
    }
    this.props.history.push(audit);
  }
}
