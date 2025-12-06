'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/providers/auth/auth.provider';
import { getUserAndRefreshAction } from '@/modules/auth/auth.actions';

const useInitializer = () => {
  const { applySignedIn, setStatus, applySignedOut, authStatus } = useAuth();
  const initialized = useRef(false);

  useEffect(() => {

    if (initialized.current || authStatus !== 'idle') return;

    const init = async () => {
        setStatus('loading');

        const res = await getUserAndRefreshAction();

        if(res.success) {
            const {user} = res.data;
            applySignedIn(user);
            setStatus('authenticated');
        }
       
        applySignedOut()
        setStatus('unauthenticated');
    };

    init();
  }, [authStatus, applySignedIn, applySignedOut, setStatus]);
};

export default useInitializer;
