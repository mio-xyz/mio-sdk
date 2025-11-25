import { BaseMioSDK } from './base.js';
import { type MioServerSDKConfig, type MioServerSDKInitConfig } from './config.js';
import { type MioOauth2TokenResponse } from './validation.js';
/**
 * Backend SDK for Mio authentication and API access
 * Handles token exchange using client secret and authenticated requests
 */
export declare class MioServerSDK extends BaseMioSDK {
    private clientSecret;
    private static instance;
    protected config: MioServerSDKConfig;
    constructor(config: MioServerSDKInitConfig);
    static init(config: MioServerSDKInitConfig): MioServerSDK;
    static getInstance(): MioServerSDK;
    exchangeCodeForTokens(code: string): Promise<MioOauth2TokenResponse>;
    /**
     * Refresh an expired access and refresh tokens using a refresh token
     *
     * @param refreshToken - The refresh token
     * @returns New token response with fresh accessToken and refreshToken
     * @throws {Error} If token refresh fails
     *
     * @example
     * ```typescript
     * const newTokens = await refreshTokens(
     *   user.refreshToken,
     * );
     * // Store new tokens in database
     * ```
     */
    refreshTokens(refreshToken: string): Promise<MioOauth2TokenResponse>;
}
//# sourceMappingURL=server.d.ts.map