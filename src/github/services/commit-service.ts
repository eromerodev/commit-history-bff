import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { whitelist } from '../../shared/consts';
import { ICommitClient } from '../interfaces/commit-client.interface';
import { ICommitService } from '../interfaces/commit-service.interface';

@Injectable()
export class CommitService implements ICommitService {
  /**
   *
   */
  constructor(
    @Inject('CommitHttpClient')
    private readonly httpClient: ICommitClient,
  ) {}
  async listCommits(applicationId: string): Promise<any> {
    const repo = whitelist[applicationId];
    if (!repo) return new BadRequestException();
    const commits = await this.httpClient.getAllCommits('eromerodev', repo);
    const output = commits.map((item) => {
      return {
        sha: item.sha,
        author: item.commit.author.name,
        avatarUrl: item.author.avatar_url,
        email: item.commit.author.email,
        message: item.commit.message,
        date: item.commit.author.date,
      };
    });

    return output;
  }
}
