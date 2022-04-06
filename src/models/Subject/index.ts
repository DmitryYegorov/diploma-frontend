export interface Subject {
  id?: string;
  name?: string;
  shortName?: string;
  createdAt?: Date;
  deletedAt?: Date | null;
  createdBy?: string;
  deletedBy?: string;
}
