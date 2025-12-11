export interface IOutfit {
  id: string;
  image: string | null;
  username: string;
  likes: number;
  isLiked: boolean;
  style?: string;
  season?: string;
}
