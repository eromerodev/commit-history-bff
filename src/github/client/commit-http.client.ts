import { Octokit } from 'octokit';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICommitClient } from '../interfaces/commit-client.interface';

@Injectable()
export class CommitHttpClient implements ICommitClient {
  octokit: Octokit;
  /**
   *
   */
  constructor(private readonly configService: ConfigService) {
    this.octokit = new Octokit({
      auth: this.configService.get<string>('github.token'),
    });
  }
  async getAllCommits(owner: string, repo: string): Promise<any> {
    const response = await this.octokit.request(
      'GET /repos/{owner}/{repo}/commits',
      {
        owner,
        repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    return response.data;
  }
}
