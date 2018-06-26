import { Proposal } from './proposal';

export class Status {
  id: number;
  status: string;
  user: object;
  proposal: Proposal;
  created_at: string;
  updated_at: string;
}
