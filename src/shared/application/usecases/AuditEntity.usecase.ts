import { Inject, Injectable } from "@nestjs/common";
import { Audit } from "@prisma/client";
import { IAuditEventListner } from "src/shared/core/interfaces/AuditEventListener.interface";
import { IUseCase } from "src/shared/core/IUseCase";
import {
  AuditDomain,
  IAuditHistory,
} from "src/shared/domain/entity/AuditDomain";
import { IAuditRepo } from "src/shared/infra/repository/IAuditRepo";
import { AuditRepository } from "src/shared/infra/repository/impl/AuditRepository";
import { AuditMapper } from "../mappers/AuditMap";

@Injectable()
export class AuditEntityUseCase implements IUseCase<IAuditEventListner, any> {
  constructor(
    @Inject(AuditRepository)
    private auditRepo: IAuditRepo
  ) {}

  async execute(payload: IAuditEventListner) {
    if (!payload.entityId) return;

    const auditDb = await this.auditRepo.findOne({
      where: {
        entityId: payload.entityId,
      },
    });
    const auditDomain = this.buildAuditDomain(auditDb, payload);

    auditDomain.addAuditHistory(this.buildHistory(payload));

    this.auditRepo.save(auditDomain);
  }

  private buildAuditDomain(auditDb: Audit, payload: IAuditEventListner) {
    if (auditDb) {
      return AuditMapper.toDomain(auditDb);
    } else {
      return AuditDomain.create({
        entityId: payload.entityId,
        entityName: payload.entityName,
      });
    }
  }

  private buildHistory(payload: IAuditEventListner): IAuditHistory | undefined {
    if (!payload?.updatedBy) return undefined;
    const history: IAuditHistory = {
      updatedBy: payload?.updatedBy,
      updatedAt: new Date().toISOString(),
      data: payload?.data,
    };
    return history;
  }
}
