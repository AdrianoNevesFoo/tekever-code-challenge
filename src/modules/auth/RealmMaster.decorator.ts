import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "querystring";
import AppError from "src/shared/core/errors/AppError";

export function RealmMaster() {
  return (target: any, propertyKey: any, descriptor: any) => {
    const originalMethod = descriptor.value;
    const newDescriptor = { ...descriptor };

    newDescriptor.value = async function (...args: any[]) {
      const body = {
        username: process.env.KEYCLOAK_MASTER_USERNAME,
        password: process.env.KEYCLOAK_MASTER_PASSWORD,
        grant_type: "password",
        client_id: process.env.KEYCLOAK_MASTER_CLIENT_ID,
        scope: "openid",
      };

      const requestConfig = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: `${process.env.KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
        method: "POST",
        data: stringify(body),
      } as AxiosRequestConfig;

      await axios
        .request(requestConfig)
        .then((result) => {
          this.axios.defaults.headers.common.Authorization = `Bearer ${result.data.access_token}`;
        })
        .catch((err) => {
          return Promise.reject(new AppError("", 403, err));
        });
      return originalMethod.apply(this, args);
    };

    return newDescriptor;
  };
}
