import { Module } from '@nestjs/common';
import { AdminGuard } from './admin-auth-guard.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [AdminGuard, JwtService],
})
export class AdminAuthGuardModule {}
