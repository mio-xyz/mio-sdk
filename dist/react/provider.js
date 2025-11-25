'use client';
import React, { createContext, useMemo } from 'react';
import { MioClientSDK } from '../client.js';
const MioContext = createContext(null);
/**
 * Provider component for Mio SDK
 * Initializes the SDK with the provided config and provides it via React context
 */
export function MioProvider({ config, children }) {
    // Initialize SDK only once using useMemo
    const sdk = useMemo(() => {
        // Only initialize in browser (not during SSR)
        if (typeof window === 'undefined') {
            // Return a placeholder during SSR
            return null;
        }
        try {
            // Initialize SDK if not already initialized
            return MioClientSDK.init(config);
        }
        catch (error) {
            // If already initialized, get the instance
            if (error instanceof Error && error.message.includes('already initialized')) {
                return MioClientSDK.getInstance();
            }
            throw error;
        }
    }, [config.clientId, config.redirectUrl, config.exchangeTokenUrl]);
    const value = useMemo(() => ({
        sdk
    }), [sdk]);
    return React.createElement(MioContext.Provider, { value: value }, children);
}
//# sourceMappingURL=provider.js.map