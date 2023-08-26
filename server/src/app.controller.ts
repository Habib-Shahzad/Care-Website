import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import * as path from 'path';

[
  '404.html',
  'admin.html',
  'community-outreach.html',
  'index.html',
  'our-activities.html',
  'our-aims.html',
  'our-team.html',
  'patient-welfare.html',
  'research-development.html',
];

@Controller()
export class AppController {
  @Get()
  serveIndex(@Res() res: Response) {
    res.sendFile(path.resolve('build', 'index.html'));
  }

  @Get('admin')
  serveAdmin(@Res() res: Response): void {
    res.sendFile(path.resolve('build', 'admin.html'));
  }

  @Get('community-outreach')
  serveCommunityOutreach(@Res() res: Response) {
    res.sendFile(path.resolve('build', 'community-outreach.html'));
  }

  @Get('our-activities')
  serveOurActivities(@Res() res: Response) {
    res.sendFile(path.resolve('build', 'our-activities.html'));
  }

  @Get('our-team')
  serveOurTeam(@Res() res: Response) {
    res.sendFile(path.resolve('build', 'our-team.html'));
  }

  @Get('patient-welfare')
  servePatientWelfare(@Res() res: Response) {
    res.sendFile(path.resolve('build', 'patient-welfare.html'));
  }

  @Get('research-development')
  serveResearchDevelopment(@Res() res: Response) {
    res.sendFile(path.resolve('build', 'research-development.html'));
  }

  @Get('our-aims')
  serveOurAims(@Res() res: Response) {
    res.sendFile(path.resolve('build', 'our-aims.html'));
  }
}
