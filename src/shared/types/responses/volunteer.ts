export interface ITagItemResponse {
  id: string;
  name: string;
}

export interface ILoadTagsResponse {
  tags: ITagItemResponse[];
}

export interface ITagsResponse {
  data: {
    tags: string[];
  };
}
