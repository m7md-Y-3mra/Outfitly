"use client";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
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
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const loadOutfits = async () => {
      console.log(user, loading);
      if (!hasMore || loading || isFetchingRef.current || !user?.id) return;

      isFetchingRef.current = true;
      setLoading(true);

      const response = await getOutfitsForExploreAction({ page: page + 1, limit: 10 }, user.id);
      if (response.success) {
        dispatch({
          type: "SET_OUTFITS",
          payload: [...state.outfits, ...response.data.data],
        });
        setPage(response.data.meta.page);
        setHasMore(response.data.meta.page < response.data.meta.totalPages);
      } else {
        toast.error("Failed to load, try again!");
      }

      setLoading(false);
      isFetchingRef.current = false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          loadOutfits();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loading, page, state.outfits, user]);

  const filtered = useMemo(() => {
    let result = state.outfits;

    if (seasonFilter && seasonFilter !== "All Seasons") {
      result = result.filter((outfit) => outfit.season === seasonFilter);
    }

    if (styleFilter && styleFilter !== "All Styles") {
      result = result.filter((outfit) => outfit.style === styleFilter);
    }

    return result;
  }, [state.outfits, seasonFilter, styleFilter]);

  return {
    outfits: filtered,
    loading,
    hasMore,
    loaderRef,
    seasonFilter,
    styleFilter,
    setSeasonFilter,
    setStyleFilter,
    dispatch,
  };
};

export default useExplore;
