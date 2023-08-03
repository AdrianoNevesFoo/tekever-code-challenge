import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClsService, ClsServiceManager } from 'nestjs-cls';
import { BaseAxios } from '../core/BaseAxios';

export default class BaseProvider {
  public baseAxios: BaseAxios;
  protected clsService: ClsService;

  constructor(
    protected eventEmitter: EventEmitter2
  ) {
    this.clsService = ClsServiceManager.getClsService();
    this.baseAxios = BaseAxios.create(this.eventEmitter, this.clsService);
  }
}
