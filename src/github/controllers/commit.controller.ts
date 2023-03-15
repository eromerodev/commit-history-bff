import { Controller, Inject, Get, HttpCode, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ICommitService } from '../interfaces/commit-service.interface';

@Controller({ path: 'api/v1/commits', version: '1' })
@ApiTags('Commits')
export class CommitController {
  /**
   *
   */
  constructor(
    @Inject('CommitService')
    private readonly commitService: ICommitService,
  ) {}

  @ApiOperation({
    summary: 'Returns all commits',
  })
  @Get('/:applicationId')
  @HttpCode(200)
  async get(@Param('applicationId') applicationId: string): Promise<any> {
    return await this.commitService.listCommits(applicationId);
  }
}
