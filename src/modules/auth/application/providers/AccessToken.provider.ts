import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig } from "axios";
import { stringify } from "querystring";
import AppError from "src/shared/core/errors/AppError";
import { BaseKeycloakProvider } from "src/modules/auth/BaseKeycloakProvider";
import { ITokenResponse } from "src/shared/core/interfaces/TokenResponse.interface";
import { IGetTokenDTO } from "../../infra/dtos/AccessTokenDTO";

@Injectable()
export class AccessTokenProvider extends BaseKeycloakProvider {
  constructor() {
    super();
  }

  public async token(payload: IGetTokenDTO): Promise<ITokenResponse> {
    const realmTarget = process.env.KEYCLOAK_REALM;
    const body = {
      client_id: process.env.KEYCLOAK_CLIENTID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      username: payload.username,
      password: payload.password,
      grant_type: "password",
      scope: "openid",
    };

    const requestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: `${this.baseUrl}/realms/${realmTarget}/protocol/openid-connect/token`,
      method: "POST",
      data: stringify(body),
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        throw new AppError(
          "Não foi possível realizar o login. Verifique seu usuário e senha.",
          403,
          err
        );
      });
  }
}
