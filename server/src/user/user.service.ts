import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { LoginReqDto } from './dto/login.req.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  tokenSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {
    this.tokenSecret = this.configService.get('TOKEN_SECRET');
  }

  getTableData() {
    return this.databaseService.getAllUsers();
  }

  addUser(data: any) {
    data.password = bcrypt.hashSync(data.password, 10);
    return this.databaseService.addUser(data);
  }

  async setActive(active: boolean, selected: string[]) {
    await this.databaseService.setUserActive(active, selected);
    const users = await this.getTableData();
    return {
      success: true,
      data: users,
    };
  }

  async setAdmin(admin: boolean, selected: string[]) {
    await this.databaseService.setUserAdmin(admin, selected);
    const users = await this.getTableData();
    return {
      success: true,
      data: users,
    };
  }

  async getLoginStatus(adminToken: string) {
    let adminUser = null;

    if (adminToken) {
      const adminData = this.jwtService.verify(adminToken, {
        secret: this.tokenSecret,
      });
      adminUser = await this.databaseService.getUserByID(adminData.user_id);
    }

    return {
      successAdmin: adminUser !== null,
      admin_user: adminUser,
    };
  }

  async login(data: LoginReqDto) {
    const user = await this.databaseService.getUserByEmail(data.email);

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
