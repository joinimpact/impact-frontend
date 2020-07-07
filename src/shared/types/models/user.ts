export interface IUser {
  userId: string;
  email: string;
  dateOfBirth: string;
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  since?: string;
}
