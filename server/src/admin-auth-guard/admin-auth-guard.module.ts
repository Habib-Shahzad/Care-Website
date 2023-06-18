import { Module } from '@nestjs/common';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  providers: [AdminAuthGuardService, JwtService],
})
export class AdminAuthGuardModule {}
