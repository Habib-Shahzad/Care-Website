import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthGuardService } from './admin-auth-guard.service';

describe('AdminAuthGuardService', () => {
  let service: AdminAuthGuardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAuthGuardService],
    }).compile();

    service = module.get<AdminAuthGuardService>(AdminAuthGuardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
