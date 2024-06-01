import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginReqDto } from './dto/login.req.dto';
import { ConfigKeys } from '../config/app.configuration';

@Injectable()
export class AuthService {
  tokenSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.tokenSecret = this.configService.get(ConfigKeys.TOKEN_SECRET);
  }

  async getLoginStatus(adminToken: string) {
    let adminUser = null;

    if (adminToken) {
      const adminData = this.jwtService.verify(adminToken, {
        secret: this.tokenSecret,
      });
      adminUser = await this.userService.findOne(adminData.user_id);
    }

    return {
      successAdmin: adminUser !== null,
      admin_user: adminUser,
    };
  }

  async login(data: LoginReqDto) {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      return {
        success: false,
        data: null,
        message: 'User not found',
      };
    }
    const userObj = user.toObject();

    if (!user.admin) {
      return {
        success: false,
        data: null,
        message: 'User is not an admin',
      };
    }

    if (user && (await bcrypt.compare(data.password, user.password))) {
      const payload = { user_id: user._id, email: data.email };
      const token = await this.jwtService.signAsync(payload, {
        secret: this.tokenSecret,
      });
      userObj['token'] = token;

      return {
        success: true,
        data: userObj,
        token,
      };
    } else {
      return {
        success: false,
        data: null,
        message: 'Invalid credentials',
      };
    }
  }
}
