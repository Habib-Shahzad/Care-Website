import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './storage/storage.module';
import { BlogModule } from './blog/blog.module';
import { ActivityModule } from './activity/activity.module';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { ImageModule } from './image/image.module';
import { HomepageModule } from './homepage/homepage.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig, { ConfigKeys } from './config/app.configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),

    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ConfigKeys.TOKEN_SECRET),
        signOptions: { expiresIn: '7d' },
      }),
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(ConfigKeys.DATABASE_URL),
      }),
    }),
    AuthModule,
    StorageModule,
    BlogModule,
    ActivityModule,
    UserModule,
    DepartmentModule,
    ImageModule,
    HomepageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
