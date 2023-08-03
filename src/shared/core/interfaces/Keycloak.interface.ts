export interface IRole {
  id: string;
  name: string;
  description: string;
  composite: boolean;
  clientRole: boolean;
  containerId: string;
}

export interface IBaseKeycloakPayload {
  realm: string;
  userId: string;
}

export interface IKeycloakUserCreatedEvent {
  accountId: string;
  userId: string;
}
