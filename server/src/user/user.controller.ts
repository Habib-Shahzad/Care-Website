import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminAuthGuardService } from 'src/admin-auth-guard/admin-auth-guard.service';
import { Request, Response } from 'express';
import { LoginReqDto } from './dto/login.req.dto';
import { SetActiveReqDto } from '../admin/dto/set.active.req.dto';
import { SetAdminReqDto } from 'src/admin/dto/set.admin.req.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminAuthGuardService)
  @Get('table-data')
  async getTableData() {
    return { data: await this.userService.getTableData() };
  }

  @Get('/loggedIn')
  isLoggedIn(@Req() request: Request) {
    return this.userService.getLoginStatus(
      request.cookies?.['access_token_admin'],
    );
  }

  @Post('/logout-admin')
  async logout(@Res() res: Response) {
    return res
      .clearCookie('access_token_admin')
      .status(200)
      .json({ message: 'Successfully logged out' });
  }

  @Post('/admin-login')
  async login(@Body() data: LoginReqDto, @Res() res: Response) {
    const response = await this.userService.login(data);
    if (response?.success) {
      res
        .cookie('access_token_admin', response?.token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 7,
        })
        .status(200)
        .json(response);
    } else {
      res.json(response);
    }
  }

  @UseGuards(AdminAuthGuardService)
  @Post('/add')
  async addUser(@Body() data: any) {
    return this.userService.addUser(data);
  }

  @UseGuards(AdminAuthGuardService)
  @Post('/set-active')
  async setActive(@Body() data: SetActiveReqDto) {
    return this.userService.setActive(data.active, data.selected);
  }

  @UseGuards(AdminAuthGuardService)
  @Post('/set-admin')
  async setAdmin(@Body() data: SetAdminReqDto) {
    return this.userService.setAdmin(data.admin, data.selected);
  }
}
