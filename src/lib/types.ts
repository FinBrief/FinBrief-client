export interface Tag {
  id: string;
  name: string;
}

export interface Source {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  summary: string;
  link: string;
  pubDate: string;
  tags: Tag[];
  users: { id: string; username: string }[];
  sourceId: string;
  source: Source;
}

export interface ApiResponse {
  posts: Post[];
  nextCursor: string | null;
}