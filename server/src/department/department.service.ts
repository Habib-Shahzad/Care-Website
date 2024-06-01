import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department, DepartmentDocument } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  async create(data: CreateDepartmentDto) {
    const newDepartment = new this.departmentModel(data);
    await newDepartment.save();
    return newDepartment;
  }

  findAll() {
    return this.departmentModel.find().exec();
  }

  findAllWithImages() {
    return this.departmentModel
      .find()
      .populate({
        path: 'members',
        populate: [{ path: 'image' }],
      })
      .exec();
  }

  findOne(id: ObjectId) {
    return this.departmentModel
      .findById(id)
      .populate({
        path: 'members',
        populate: [{ path: 'image' }],
      })
      .exec();
  }

  async update(data: UpdateDepartmentDto) {
    const { _id, ...updateData } = data;
    return await this.departmentModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.departmentModel.deleteOne({ _id: id }).exec();
  }

  deleteMany(ids: string[]) {
    return this.departmentModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  setActive(active: boolean, selected: string[]) {
    return this.departmentModel.updateMany(
      { _id: { $in: selected } },
      { active: active },
    );
  }
}
