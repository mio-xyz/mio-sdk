import type { GetContextRequestOptions, MioSDKOptions } from '../base.js';
/**
 * React hook for Mio authentication and API access
 * Handles OAuth callback flow internally for seamless integration
 */
export declare function useMio(): {
    connect: () => Promise<void>;
    handleMioCallback: () => Promise<{
        accessToken: string;
        idToken: string | undefined;
        expiresIn: number;
        scope: string;
        tokenType: string;
        refreshToken: string;
    }>;
    getContext: (options: GetContextRequestOptions) => Promise<string>;
    getContextSummary: (options: MioSDKOptions) => Promise<string | null>;
    isLoading: boolean;
    error: string | null;
};
//# sourceMappingURL=hooks.d.ts.map