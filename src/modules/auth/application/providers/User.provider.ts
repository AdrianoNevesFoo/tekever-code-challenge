import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AppError from "src/shared/core/errors/AppError";
import { ICreateUser } from "src/shared/interfaces/CreateUser.interface";
import { RealmMaster } from "../../RealmMaster.decorator";

export interface IKeycloakUser {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName?: string;
  enabled?: boolean;
  attributes?: {};
  groups?: [];
  emailVerified?: boolean;
  requiredActions?: string[];
  clientRoles?: {};
  realmRoles?: string[];
}

@Injectable()
export class UserProvider {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  @RealmMaster()
  public async create(payload: ICreateUser): Promise<any> {
    const realmTarget = process.env.KEYCLOAK_REALM;

    const body = {
      username: payload.email,
      email: payload.email,
      firstName: payload.name,
      lastName: "",
      credentials: [
        {
          type: "password",
          value: payload.password,
          temporary: false,
        },
      ],
      enabled: true,
      groups: [],
      emailVerified: true,
    };

    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.KEYCLOAK_URL}/admin/realms/${realmTarget}/users`,
      method: "POST",
      data: body,
      timeout: 120000,
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        const userId = this.getKeycloakUserId(result);

        return {
          name: payload.name,
          email: payload.email,
        };
      })
      .catch((error) => {
        throw new AppError("Erro ao criar usuário", 400);
      });
  }

  private getKeycloakUserId(keycloakResult: any): string {
    const keycloakHeaders = keycloakResult?.headers["location"];
    return keycloakHeaders ? keycloakHeaders.split("/").pop() : "";
  }

  @RealmMaster()
  public async getUserByEmail(email: string): Promise<IKeycloakUser> {
    const realmTarget = process.env.KEYCLOAK_REALM;
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      url: `${process.env.KEYCLOAK_URL}/admin/realms/${realmTarget}/users`,
      method: "GET",
      params: {
        email,
      },
    } as AxiosRequestConfig;
    return this.axios
      .request(requestConfig)
      .then((result) => {
        return result?.data[0];
      })
      .catch((error) => {
        throw new AppError("", 403, error);
      });
  }
}
