import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { IAuditEventListner } from "src/shared/core/interfaces/AuditEventListener.interface";
import { AuditEntityUseCase } from "../usecases/AuditEntity.usecase";

@Injectable()
export default class AuditEventListener {
  constructor(private auditEntityUseCase: AuditEntityUseCase) {}

  @OnEvent("audit.event")
  async updateKeycloakUserIdOnAccount(payload: IAuditEventListner) {
    try {
      await this.auditEntityUseCase.execute(payload);
    } catch (error) {
      console.log(error);
    }
  }
}
