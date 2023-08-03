import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Prisma } from "@prisma/client";
import { AuditMapper } from "src/shared/application/mappers/AuditMap";
import { BaseRepository } from "src/shared/core/Base.repository";
import { AuditDomain } from "src/shared/domain/entity/AuditDomain";
import { PrismaRepository } from "src/shared/infra/database/prisma/PrismaRepository";
import { IAuditRepo } from "../IAuditRepo";

@Injectable()
export class AuditRepository extends BaseRepository implements IAuditRepo {
  constructor(
    private prismaRepository: PrismaRepository,
    public emitter: EventEmitter2
  ) {
    super(prismaRepository, emitter, "audit");
  }

  async save(audit: AuditDomain): Promise<any | undefined> {
    if (
      !audit.entityId ||
      !audit.entityName ||
      !audit.history ||
      audit.history.length == 0
    )
      return;
    const auditDb: Prisma.AuditCreateInput = AuditMapper.toPersistence(audit);
    return await this.prismaRepository.audit.upsert({
      create: auditDb,
      where: {
        entityId: audit.entityId,
      },
      update: {
        history: auditDb.history,
      },
    });
  }
}
