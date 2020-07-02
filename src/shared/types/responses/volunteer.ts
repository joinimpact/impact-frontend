export interface ITagItemResponse {
  id: string;
  name: string;
}

export interface ILoadTagsResponse {
  tags: ITagItemResponse[];
}
