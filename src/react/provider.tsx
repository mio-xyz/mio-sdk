'use client';

import React, { createContext, useMemo, type ReactNode } from 'react';
import { MioClientSDK } from '../client.js';
import type { MioClientSDKInitConfig } from '../config.js';

interface MioContextValue {
  sdk: MioClientSDK;
}

const MioContext = createContext<MioContextValue | null>(null);

/**
 * Provider component for Mio SDK
 * Initializes the SDK with the provided config and provides it via React context
 */
export function MioProvider({
  config,
  children
}: {
  config: MioClientSDKInitConfig;
  children: ReactNode;
}) {
  // Initialize SDK only once using useMemo
  const sdk = useMemo(() => {
    // Only initialize in browser (not during SSR)
    if (typeof window === 'undefined') {
      // Return a placeholder during SSR
      return null as unknown as MioClientSDK;
    }

    try {
      // Initialize SDK if not already initialized
      return MioClientSDK.init(config);
    } catch (error) {
      // If already initialized, get the instance
      if (error instanceof Error && error.message.includes('already initialized')) {
        return MioClientSDK.getInstance();
      }
      throw error;
    }
  }, [config.clientId, config.redirectUrl, config.exchangeTokenUrl]);

  const value = useMemo(
    () => ({
      sdk
    }),
    [sdk]
  );

  return <MioContext.Provider value={value}>{children}</MioContext.Provider>;
}
