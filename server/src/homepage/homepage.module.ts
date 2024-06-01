import { Module } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HomePage, HomePageSchema } from './entities/homepage.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HomePage.name, schema: HomePageSchema },
    ]),
  ],
  controllers: [HomepageController],
  providers: [HomepageService],
})
export class HomepageModule {}
