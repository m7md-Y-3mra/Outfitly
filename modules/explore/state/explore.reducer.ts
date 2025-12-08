import { IOutfit } from "../types/explore.type";

export interface IExploreState {
  outfits: IOutfit[];
}

export type Action = 
  | { type: "SET_OUTFITS"; payload: IOutfit[] }
  | {type: "LIKE_OUTFIT"; payload: {userId: string, outfitId: string}}
  | {type: "UNLIKE_OUTFIT"; payload: {userId: string, outfitId: string}}


export const reducer = (state: IExploreState, action: Action): IExploreState => {
      switch (action.type) {
        case "SET_OUTFITS":
          return {
            ...state,
            outfits: action.payload,
          };
        case "LIKE_OUTFIT":
          return {
            ...state,
            outfits: state.outfits.map((outfit) =>
              outfit.id === action.payload.outfitId
                ? { ...outfit, likes: outfit.likes + 1, isLiked: true }
                : outfit
            ),
          };
        case "UNLIKE_OUTFIT":
          return {
            ...state,
            outfits: state.outfits.map((outfit) =>
              outfit.id === action.payload.outfitId
                ? { ...outfit, likes: outfit.likes - 1, isLiked: false }
                : outfit
            ),
          };
        default:
          return state;
      }
}
