import type { MioClientSDKConfig, MioClientSDKInitConfig, MioServerSDKConfig, MioServerSDKInitConfig } from './config.js';
import { type MioChatResponse } from './validation.js';
export interface MioSDKOptions {
    accessToken: string;
}
export interface ChatRequestOptions extends MioSDKOptions {
    query: string;
}
/**
 * Base SDK class with shared functionality for both client and server SDKs
 */
export declare abstract class BaseMioSDK {
    protected config: MioClientSDKConfig | MioServerSDKConfig;
    constructor(config: MioClientSDKInitConfig | MioServerSDKInitConfig);
    private authenticatedFetch;
    chat(options: ChatRequestOptions): Promise<MioChatResponse>;
    getUserSummary(options: MioSDKOptions): Promise<string | null>;
}
//# sourceMappingURL=base.d.ts.map