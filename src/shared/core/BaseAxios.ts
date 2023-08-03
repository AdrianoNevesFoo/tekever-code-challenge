import { EventEmitter2 } from '@nestjs/event-emitter';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ClsService } from 'nestjs-cls';

export class BaseAxios {
  private axios: AxiosInstance;

  public constructor() {
    this.axios = axios.create();
  }

  static create(eventEmitter: EventEmitter2, clsService: ClsService) {
    const baseAxios = new BaseAxios();
    return baseAxios;
  }

  request(requestConfig: AxiosRequestConfig, step?: string): Promise<any> {
    const requestMetadata = JSON.parse(JSON.stringify(requestConfig));
    delete requestMetadata.headers?.Authorization;
    return this.axios
      .request(requestConfig)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        if (this.axios?.defaults?.headers?.common?.Authorization) {
          delete this.axios.defaults.headers.common.Authorization;
          console.log(this.axios);
        }
      });
  }
}
