// Configuration types for Mio SDK
// Base configuration (shared)

export interface MioBaseSDKInitConfig {
  clientId: string;
  redirectUrl: string;
}

export interface MioBaseSDKConfig extends MioBaseSDKInitConfig {
  scope: string;
  llmUrl: string;
}

export interface MioClientSDKInitConfig extends MioBaseSDKInitConfig {
  exchangeTokenUrl: string;
}

export interface MioClientSDKConfig extends MioBaseSDKConfig, MioClientSDKInitConfig {
  dashboardUrl: string;
}

export interface MioServerSDKInitConfig extends MioBaseSDKInitConfig {
  clientSecret: string;
}

// Server SDK config (with client secret)
export interface MioServerSDKConfig extends MioServerSDKInitConfig, MioBaseSDKConfig {
  authUrl: string;
}

export const DEFAULT_AUTH_URL = 'https://auth.mio.xyz';
export const DEFAULT_DASHBOARD_URL = 'https://dashboard.mio.xyz';
export const DEFAULT_LLM_URL = 'https://llm.mio.xyz';
