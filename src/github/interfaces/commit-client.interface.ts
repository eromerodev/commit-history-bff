export interface ICommitClient {
  getAllCommits(owner: string, repo: string): Promise<any>;
}
