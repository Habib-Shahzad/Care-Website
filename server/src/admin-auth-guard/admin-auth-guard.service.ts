import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigKeys } from '../config/app.configuration';

@Injectable()
export class AdminGuard implements CanActivate {
  readonly tokenSecret: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.tokenSecret = this.configService.get(ConfigKeys.TOKEN_SECRET);
  }

  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();

    const authorization = req.headers.authorization;
    const token = authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException(
        'Sorry, Only admins are allowed to access this API.',
      );
    }

    try {
      this.jwtService.verify(token, {
        secret: this.tokenSecret,
      });
      req['token'] = token;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid Token');
    }

    return true;
  }
}
