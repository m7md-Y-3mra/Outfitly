import { useEffect, useMemo, useReducer, useState } from "react";
import { reducer } from "../state/explore.reducer";
import { getOutfitsForExploreAction } from "../explore.actions";
import { useAuth } from "@/providers/auth/auth.provider";
import { toast } from "sonner";

const useExplore = () => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    outfits: [],
  });
  const [styleFilter, setStyleFilter] = useState("All Styles");
  const [seasonFilter, setSeasonFilter] = useState("All Seasons");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOutfits = async () => {
      const response = await getOutfitsForExploreAction({ page: 1, limit: 10 }, user!.id);
      setLoading(false);
      if (response.success) {
        dispatch({ type: "SET_OUTFITS", payload: response.data.data });
      }
      console.log(response.message);
      toast.error("Failed to load, please try again!");
    };
    getOutfits();
  }, []);

  const filtered = useMemo(() => {
    let result = state.outfits;

    if (seasonFilter) {
      result = result.filter((outfit) => outfit.season === seasonFilter);
    }

    if (styleFilter) {
      result = result.filter((outfit) => outfit.style === styleFilter);
    }

    return result;
  }, [state.outfits, seasonFilter, styleFilter]);

  return {
    filtered,
    loading,
    setSeasonFilter,
    setStyleFilter,
    dispatch,
  };
};

export default useExplore;
