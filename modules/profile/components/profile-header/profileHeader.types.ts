import type { User } from "../../profile.types";

export interface ProfileHeaderProps {
  user: User;
}

export interface ExtendedProfileHeaderProps extends ProfileHeaderProps {
  isEditing: boolean;
  editForm: User | null;
  onStartEditing: () => void;
  onCancelEditing: () => void;
  onSaveEditing: () => void;
  onUpdateForm: (field: keyof User, value: string) => void;
}
