import { Controller, Req } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
    constructor(private readonly feedService:FeedService){}
    async getFeed(@Req() req){
        return await this.feedService.getFeed(req.user.id)

    }
}
