"use client";
import { useAuth } from "@/providers/auth/auth.provider";
import { useTheme } from "next-themes";
import { ActionDispatch, useTransition } from "react";
import { IOutfit } from "../types/explore.type";
import { Action } from "../state/explore.reducer";
import { likeOutfitAction, unlikeOutfitAction } from "../explore.actions";
import { toast } from "sonner";

const useOutfit = (outfit: IOutfit, dispatch: ActionDispatch<[action: Action]>) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const onToggleLike = () => {
    if (!user || isPending) return;

    const wasLiked = outfit.isLiked;
    const optimisticAction = wasLiked ? "UNLIKE_OUTFIT" : "LIKE_OUTFIT";

    dispatch({
      type: optimisticAction,
      payload: { outfitId: outfit.id, userId: user.id },
    });

    startTransition(async () => {
      const response = wasLiked
        ? await unlikeOutfitAction(outfit.id, user.id)
        : await likeOutfitAction(outfit.id, user.id);

      if (!response.success) {
        const rollbackAction = wasLiked ? "LIKE_OUTFIT" : "UNLIKE_OUTFIT";

        dispatch({
          type: rollbackAction,
          payload: { outfitId: outfit.id, userId: user.id },
        });

        if (response.statusCode === 409) {
          toast.warning(
            wasLiked ? "You haven't liked this outfit yet." : "You already liked this outfit!",
          );
        } else {
          toast.error("Something went wrong. Please try again.");
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
