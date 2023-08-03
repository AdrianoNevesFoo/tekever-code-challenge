import { StringUtils } from 'src/shared/utils/StringUtils';
import { BaseError } from './BaseError';

export interface AppErrorProps {
  friendlyMessage: string;
  status: number;
  err: any;
  customError?: string;
}
export default class AppError extends BaseError {
  constructor(friendlyMessage: string, status: number, err: any = {}) {
    super(friendlyMessage);
    if (!StringUtils.hasLength(friendlyMessage))
      friendlyMessage = 'Oops, algo deu errado! Tente novamente mais tarde.';

    this.status = status || 500;
    this.friendlyMessage = friendlyMessage;

    if (err) {
      this.errors = this.buildErrors(err);
      // this.printError(err);
    } else {
      // this.errors = [customError || ''];
      this.printMessages();
    }
  }

  printMessages() {
    console.log('\n');
    console.log('------------------------ERRO------------------------');
    console.log(`status: ${this.status}`);
    console.log(`message: ${this.friendlyMessage}`);
    console.log('------------------------ERRO------------------------');
    console.log('\n');
  }
}
