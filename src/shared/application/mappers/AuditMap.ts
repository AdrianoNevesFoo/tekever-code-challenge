import { Audit, Prisma } from "@prisma/client";
import { AuditDomain, AuditProps } from "src/shared/domain/entity/AuditDomain";

export class AuditMapper {
  static toDomain(dbAudit: Audit): AuditDomain {
    const auditProps = {
      entityId: dbAudit.entityId,
      entityName: dbAudit.entityName,
      history: dbAudit.history,
    } as AuditProps;

    return AuditDomain.create(auditProps);
  }

  static toPersistence(audit: AuditDomain): Prisma.AuditCreateInput {
    return {
      entityId: audit.entityId,
      entityName: audit.entityName,
      history: audit.history,
    } as Prisma.AuditCreateInput;
  }
}
