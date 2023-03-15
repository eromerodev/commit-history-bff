import { CommitDto } from '../dto/commit.dto';

export interface ICommitService {
  listCommits(applicationId: string): Promise<CommitDto[]>;
}
