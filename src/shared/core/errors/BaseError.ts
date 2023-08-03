import { SummaryError } from './SummaryError.domain';

export abstract class BaseError extends Error {
  public status: number;
  public errors: string[];
  public friendlyMessage: string;

  constructor(defaultMessage?: string) {
    super(defaultMessage);
    this.friendlyMessage = defaultMessage || '';
  }

  getStatus(err) {
    if (err?.status) {
      return err.status;
    } else if (err?.response?.status) {
      return err.response.status;
    } else return 500;
  }

  buildErrors(err: any): string[] {
    let messages: string[] = [];
    if (err?.response?.data?.erros) {
      return this.parseErrors(err?.response?.data?.erros);
    }

    if (err?.response?.data?.error_description) {
      messages.push(err?.response?.data?.error_description);
      return messages;
    }

    if (err?.response?.data?.message) {
      messages.push(err?.response?.data?.message);
      return messages;
    }

    if (err?.response?.data?.Message) {
      messages.push(err?.response?.data?.Message);
      return messages;
    }

    if (err.message) {
      return [err.message];
    }
    return [];
  }

  parseErrors(erros: any[]) {
    try {
      return erros.map((element) => element.mensagem);
    } catch (err) {
      return erros;
    }
  }
  printError(err: any) {
    const summary = new SummaryError(err);
    console.log('\n');
    console.log('------------------------ERRO------------------------');
    summary.print();
    console.log('------------------------ERRO------------------------');
    console.log('\n');
  }
}
