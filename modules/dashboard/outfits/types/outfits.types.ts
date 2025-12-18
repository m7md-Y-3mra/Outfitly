export interface Outfit {
  id: number;
  name: string;
  creator: string;
  likes: string;
  date: string;
  status: string;
}

export interface OutfitsTableRowProps {
  outfit: Outfit;
}
