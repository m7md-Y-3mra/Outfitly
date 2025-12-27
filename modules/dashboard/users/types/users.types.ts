export interface User {
  id: string;
  name: string;
  email: string;
  outfits: number;
  status: string;
  joined: string;
}

export interface UsersTableRowProps {
  user: User;
}
