import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class TaskService{
    @Cron(CronExpression.EVERY_10_SECONDS)
        hanleCron(){
            console.log("Cron running on very 10sec")
        }
}