import React, { type ReactNode } from 'react';
import type { MioClientSDKInitConfig } from '../config.js';
/**
 * Provider component for Mio SDK
 * Initializes the SDK with the provided config and provides it via React context
 */
export declare function MioProvider({ config, children }: {
    config: MioClientSDKInitConfig;
    children: ReactNode;
}): React.JSX.Element;
//# sourceMappingURL=provider.d.ts.map