"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/providers/auth/auth.provider";
import { getUserAndRefreshAction } from "@/modules/auth/auth.actions";

const useInitializer = () => {
  const { applySignedIn, setStatus, applySignedOut, authStatus } = useAuth();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || authStatus !== "idle") return;
    initialized.current = true;
    const init = async () => {
      setStatus("loading");

      const res = await getUserAndRefreshAction();

      if (res.success) {
        const { user } = res.data;
        applySignedIn(user);
        console.log(user, "I am res");
        setStatus("authenticated");
        return;
      }

      applySignedOut();
      setStatus("unauthenticated");
    };

    init();
  }, [authStatus, applySignedIn, applySignedOut, setStatus]);
};

export default useInitializer;
