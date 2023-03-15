import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommitController } from './controllers/commit.controller';
import { CommitService } from './services/commit-service';
import { CommitHttpClient } from './client/commit-http.client';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [CommitController],
  providers: [
    {
      provide: 'CommitService',
      useClass: CommitService,
    },
    {
      provide: 'CommitHttpClient',
      useClass: CommitHttpClient,
    },
  ],
})
export class GithubModule {}
