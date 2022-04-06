import { User } from "../user";

export interface Login {
  access: string;
  refresh: string;
  user: User;
}
