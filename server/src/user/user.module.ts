import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseService } from '../database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../database/schemas/user.model.schema';
import { JwtService } from '@nestjs/jwt';
import { Blog, BlogSchema } from 'src/database/schemas/blog.model.schema';
import {
  Department,
  DepartmentSchema,
} from 'src/database/schemas/department.model.schema';
import { Image, ImageSchema } from 'src/database/schemas/image.model.schema';
import {
  Activity,
  ActivitySchema,
} from 'src/database/schemas/activity.model.schema';
import {
  HomePage,
  HomePageSchema,
} from 'src/database/schemas/home.page.model.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: Image.name, schema: ImageSchema },
      { name: Activity.name, schema: ActivitySchema },
      { name: HomePage.name, schema: HomePageSchema },
    ]),
  ],
  providers: [UserService, DatabaseService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
