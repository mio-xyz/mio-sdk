import { BaseMioSDK } from './base.js';
import { type MioClientSDKConfig, type MioClientSDKInitConfig } from './config.js';
import { type MioOauth2TokenResponse } from './validation.js';
/**
 * Frontend SDK for Mio authentication and API access
 * Handles OAuth flow, token exchange via backend, and authenticated requests
 */
export declare class MioClientSDK extends BaseMioSDK {
    private static instance;
    protected config: MioClientSDKConfig;
    constructor(config: MioClientSDKInitConfig);
    static init(config: MioClientSDKInitConfig): MioClientSDK;
    static getInstance(): MioClientSDK;
    connect(): Promise<void>;
    _extractCodeFromUrl(): string | null;
    exchangeCode(code: string): Promise<MioOauth2TokenResponse>;
}
//# sourceMappingURL=client.d.ts.map