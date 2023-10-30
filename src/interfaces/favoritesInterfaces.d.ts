export enum ContentType {
  TV = 'tv',
  MOVIE = 'movie',
}

export interface Favorite {
  id: number;
  type: ContentType;
}

export interface FavoritesOk {
  ok: boolean;
  data: Prisma.JsonArray<Favorite>;
}
