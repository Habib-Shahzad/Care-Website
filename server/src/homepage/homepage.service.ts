import { Injectable } from '@nestjs/common';
import { CreateHomepageDto } from './dto/create-homepage.dto';
import { UpdateHomepageDto } from './dto/update-homepage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HomePage, HomePageDocument } from './entities/homepage.entity';

@Injectable()
export class HomepageService {
  constructor(
    @InjectModel(HomePage.name) private homePageModel: Model<HomePageDocument>,
  ) {}

  async create(data: CreateHomepageDto) {
    const newHomePage = new this.homePageModel(data);
    await newHomePage.save();
    return newHomePage;
  }

  find() {
    return this.homePageModel
      .findOne()
      .populate('mainImage')
      .populate('ambassadorImage')
      .exec();
  }

  update(data: UpdateHomepageDto) {
    const { _id, ...updateData } = data;
    if (!_id) return this.create(data);
    return this.homePageModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
  }
}
