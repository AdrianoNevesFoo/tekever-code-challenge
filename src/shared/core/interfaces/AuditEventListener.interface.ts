export interface IAuditEventListner {
  updatedBy: string;
  entityId: string;
  entityName: string;
  data: any;
}
