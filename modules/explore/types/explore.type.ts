export interface IOutfit {
  id: string;
  image: string | null;
  username: string;
  likes: number;
  isLiked: boolean;
  style?: string | undefined;
  season?: string | undefined;
}
