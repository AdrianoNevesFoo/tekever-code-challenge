export interface ConfigProps {
  url: string;
  method: string;
  data: string;
  headers: any;
}

export interface ResponseProps {
  data: any;
  status: number;
  statusText: string;
}

export class SummaryError {
  config: ConfigProps;
  response: ResponseProps;
  message: string;
  status: number;

  public constructor(err: any) {
    this.config = this.parseConfig(err?.config);
    this.response = this.parseResponse(err?.response);
    this.message = err?.message;
    this.status = err?.status;
  }

  private parseConfig(config: any | null): ConfigProps {
    if (config) {
      return {
        url: config?.url,
        method: config?.method,
        data: config?.data,
        headers: config?.headers,
      } as ConfigProps;
    }
    return {} as ConfigProps;
  }

  private parseResponse(response: any | null) {
    if (response) {
      return {
        data: response?.data,
        status: response?.status,
        statusText: response?.statusText,
      };
    }
    return {} as ResponseProps;
  }

  public print() {
    console.log(`config: ${JSON.stringify(this.config)}`);
    console.log(`response: ${JSON.stringify(this.response)}`);
    console.log(`message: ${JSON.stringify(this.message)}`);
    console.log(`status: ${JSON.stringify(this.status)}`);
  }
}
