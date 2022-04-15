export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  email?: string;
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  password?: string;
  role?: Roles;
  activationCode?: string | null;
  activatedAt?: Date | null;
  createdAt?: Date;
  invitedAt?: Date;
  invitedBy?: string | null;
  isActive?: boolean;
}
