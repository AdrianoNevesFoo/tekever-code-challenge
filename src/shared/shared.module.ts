import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import AuditEventListener from "./application/listeners/Audit.event.listener";
import { AuditEntityUseCase } from "./application/usecases/AuditEntity.usecase";
import { BaseRepository } from "./core/Base.repository";
import { AllExceptionsFilter } from "./core/filters/AllExceptions.filter";
import { PrismaRepository } from "./infra/database/prisma/PrismaRepository";
import { AuditRepository } from "./infra/repository/impl/AuditRepository";

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [
    BaseRepository,
    PrismaRepository,
    AllExceptionsFilter,
    AuditEventListener,
    AuditEntityUseCase,
    AuditRepository,
  ],
  exports: [],
})
export class SharedModule {}
