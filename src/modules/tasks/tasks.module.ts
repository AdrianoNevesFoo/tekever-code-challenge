import { Module } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { TvShowCrawlerSchedule } from "./schedules/TvShowCrawler";

@Module({
  providers: [SchedulerRegistry, TvShowCrawlerSchedule],
})
export class TasksModule {}
