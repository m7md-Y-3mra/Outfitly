import { useAuth } from "@/providers/auth/auth.provider";
import { useTheme } from "next-themes";
import { ActionDispatch, useTransition } from "react";
import { IOutfit } from "../types/explore.type";
import { Action } from "../state/explore.reducer";
import { likeOutfitAction } from "../explore.actions";

const useOutfit = (outfit: IOutfit, dispatch: ActionDispatch<[action: Action]>) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const onToggleLike = () => {
    const action = outfit.isLiked ? "UNLIKE_OUTFIT" : "LIKE_OUTFIT";

    dispatch({ type: action, payload: { outfitId: outfit.id, userId: user!.id } });

    startTransition(async () => {
      if (!outfit.isLiked) {
        const response = await likeOutfitAction(outfit.id, user!.id);
        if (!response.success) {
          dispatch({ type: "UNLIKE_OUTFIT", payload: { outfitId: outfit.id, userId: user!.id } });
        }
      }
    });
  };

  return {
    isPending,
    theme,
    onToggleLike,
  };
};

export default useOutfit;
