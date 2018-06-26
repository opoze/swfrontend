import { Suplier } from './suplier';
import { Category } from './category';
import { Status } from './status';

export class Proposal {
  id: number;
  name: string;
  category: Category;
  suplier: Suplier;
  status: Status;
  created_at: string;
  value: string;
  file: string;
  description: string;
}
