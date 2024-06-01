import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDto) {
    data.password = bcrypt.hashSync(data.password, 10);
    const newUser = new this.userModel(data);
    await newUser.save();
    return newUser;
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  update(data: UpdateUserDto) {
    const { _id, ...updateData } = data;

    return this.userModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }

  deleteMany(ids: string[]) {
    return this.userModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  async setActive(active: boolean, selected: string[]) {
    await this.userModel.updateMany(
      { _id: { $in: selected } },
      { active: active },
    );
  }

  async setAdmin(admin: boolean, selected: string[]) {
    await this.userModel.updateMany(
      { _id: { $in: selected } },
      { admin: admin },
    );
  }
}
