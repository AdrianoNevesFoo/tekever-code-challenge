import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class TvShowCrawlerSchedule {
  @Inject(EventEmitter2)
  private eventEmitter: EventEmitter2;

  @Cron(CronExpression.EVERY_5_MINUTES)
  updateTelemetry() {
    try {
      this.eventEmitter.emit("crawler.tvshow");
    } catch (error) {
      console.log(error);
    }
  }
}
