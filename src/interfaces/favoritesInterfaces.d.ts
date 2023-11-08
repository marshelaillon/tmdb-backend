import { MediaType } from './tmdbInterfaces';

export interface Favorite {
  id: number;
  type: MediaType;
}

export interface FavoritesOk {
  ok: boolean;
  data: Prisma.JsonArray<Favorite>;
}
