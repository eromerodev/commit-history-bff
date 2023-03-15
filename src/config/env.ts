import * as dotenv from 'dotenv';
dotenv.config();

const { PORT } = process.env;

export interface IEnvironment {
  port: number;
  accessToken: string;
}

export const env = (): IEnvironment => ({
  port: PORT ? Number(PORT) : 3000,
  accessToken: process.env.GITHUB_ACCESS_TOKEN,
});
