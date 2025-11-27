'use client';

import { useCallback, useState } from 'react';
import type { GetContextRequestOptions, MioSDKOptions } from '../base.js';
import { MioClientSDK } from '../client.js';

/**
 * React hook for Mio authentication and API access
 * Handles OAuth callback flow internally for seamless integration
 */
export function useMio() {
  const [authState, setAuthState] = useState<{
    isLoading: boolean;
    error: string | null;
  }>({
    isLoading: false,
    error: null
  });

  const connect = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await MioClientSDK.getInstance().connect();
      // Note: browser will redirect, so this won't complete
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Connection failed'
      }));
    }
  }, []);

  // Handle OAuth callback (extracts code and exchanges for tokens)
  const handleMioCallback = useCallback(async () => {
    const sdk = MioClientSDK.getInstance();
    const code = sdk._extractCodeFromUrl();
    if (!code) {
      throw new Error('No code found in URL, cannot exchange for tokens');
    }

    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const tokens = await sdk.exchangeCode(code);
      setAuthState(prev => ({
        ...prev,
        error: null,
        isLoading: false
      }));
      return tokens;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Authentication failed',
        isLoading: false
      }));
      throw error;
    }
  }, []);

  const getContext = useCallback(async (options: GetContextRequestOptions) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const result = await MioClientSDK.getInstance().getContext(options);
      setAuthState(prev => ({ ...prev, error: null, isLoading: false }));
      return result;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Chat failed'
      }));
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const getContextSummary = useCallback(async (options: MioSDKOptions): Promise<string | null> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const result = await MioClientSDK.getInstance().getContextSummary(options);
      return result;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Summary failed'
      }));
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  return {
    ...authState,
    connect,
    handleMioCallback,
    getContext,
    getContextSummary
  };
}
