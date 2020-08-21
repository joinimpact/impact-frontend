import { IVolunteerProfileField } from 'shared/types/responses/chat';
import { IServerResponseTagItem } from 'shared/types/responses/shared';
import { IAddressLocation } from 'shared/types/requests/auth';

export interface IUser {
  userId: string;
  email: string;
  dateOfBirth: string;
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  school: string | null;
  since?: string;
  lastOnline: string;
  location: IAddressLocation;
  profile: IVolunteerProfileField[];
  tags: IServerResponseTagItem[];
}
