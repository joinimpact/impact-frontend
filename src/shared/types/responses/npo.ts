export interface ICreateOrganizationResponse {
  organizationId: string;
}

export interface IUploadNPOLogoResponse {
  profilePicture: string;
  success: boolean;
}

export interface INPOTagItem {
  id: string;
  name: string;
}

export interface INPOTagsResponse {
  tags: INPOTagItem[];
}
