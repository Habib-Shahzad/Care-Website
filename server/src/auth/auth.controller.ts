import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/login.req.dto';
import { AdminGuard } from '../admin-auth-guard/admin-auth-guard.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AdminGuard)
  @Get()
  isLoggedIn(@Req() request: Request & { token: string }) {
    return this.authService.getLoginStatus(request?.token);
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
    const response = await this.authService.login(data);
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
}
