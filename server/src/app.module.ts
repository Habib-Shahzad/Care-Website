import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './database/schemas/user.model.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminAuthGuardModule } from './admin-auth-guard/admin-auth-guard.module';
import appConfiguration from './config/app.configuration';
import { JwtModule } from '@nestjs/jwt';
import { Blog, BlogSchema } from './database/schemas/blog.model.schema';
import {
  Department,
  DepartmentSchema,
} from './database/schemas/department.model.schema';
import {
  OutreachBlog,
  OutreachBlogSchema,
} from './database/schemas/outreach-blog.model.schema';
import { Image, ImageSchema } from './database/schemas/image.model.schema';
import {
  Activity,
  ActivitySchema,
} from './database/schemas/activity.model.schema';
import { AdminService } from './admin/admin.service';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [appConfiguration],
          isGlobal: true,
        }),
      ],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('DATABASE_URL'),
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          load: [appConfiguration],
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN_SECRET'),
        signOptions: { expiresIn: '700h' },
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: Image.name, schema: ImageSchema },
      { name: OutreachBlog.name, schema: OutreachBlogSchema },
      { name: Activity.name, schema: ActivitySchema },
    ]),
    UserModule,
    AdminAuthGuardModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminService, DatabaseService],
})
export class AppModule {}