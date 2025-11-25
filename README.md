# @mio/mio-sdk

Mio SDK for authentication and API access. Provides separate client and server SDKs for different environments.

## Installation

```bash
npm add @mio/mio-sdk
yarn add @mio/mio-sdk
pnpm add @mio/mio-sdk
```

## Quick Start

### Backend usage (exchange authorization code for tokens)

```typescript
import { Mio } from '@mio/mio-sdk/server';

// Initialize once in your app (e.g. on server startup)
Mio.init({
  clientId: process.env.MIO_CLIENT_ID!,
  redirectUrl: process.env.MIO_REDIRECT_URL!,
  clientSecret: process.env.MIO_CLIENT_SECRET!
});

// In your API route
app.post('/api/exchange-token', async (req, res) => {
  const { code } = req.body;
  const mio = Mio.getInstance();
  const tokens = await mio.exchangeCodeForTokens(code);

  // Persist refreshToken if you want to refresh access tokens later
  // await saveTokensForUser(userId, tokens);

  res.json(tokens);
});
```

### Frontend usage (Next.js / React)

Wrap your app with `MioProvider` to initialize the SDK once, then consume `useMio` anywhere in the tree.

```typescript
// app/providers.tsx
'use client';

import type { ReactNode } from 'react';
import type { MioClientSDKInitConfig } from '@mio/mio-sdk';
import { MioProvider } from '@mio/mio-sdk/react';

const mioConfig: MioClientSDKInitConfig = {
  clientId: process.env.NEXT_PUBLIC_MIO_CLIENT_ID!,
  redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
  exchangeTokenUrl: '/api/exchange-token'
};

export function Providers({ children }: { children: ReactNode }) {
  return <MioProvider config={mioConfig}>{children}</MioProvider>;
}
```

```typescript
// app/chat/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useMio } from '@mio/mio-sdk/react';

export default function ChatPage() {
  const { connect, handleMioCallback, chat } = useMio();

  useEffect(() => {
    handleMioCallback()
      .then(tokens => {
        // Store your access token
      });
  }, [handleMioCallback]);

  const handleAsk = async () => {
    // You can choose to connect before the chat or in a separate button
    if (!accessToken) {
      await connect(); // kicks off OAuth if needed
      return;
    }

    const response = await chat({
      query: 'What can you tell me about this user?',
      k: 3,
      accessToken
    });

    console.log(response);
  };

  return (
    ...
  );
}
```

## API Reference

### Mio (frontend)

Frontend SDK for browser environments.

#### Methods

- `init(config: MioClientSDKInitConfig)` - Initialize the SDK singleton
- `getInstance()` - Get the initialized SDK instance (throws if not initialized)
- `connect()` - Redirect to the Mio dashboard OAuth flow
- `exchangeCode(code)` - Exchange an authorization code for tokens via your backend `exchangeTokenUrl`
- `chat({ accessToken, query })` - Send a chat message to the LLM
- `getUserSummary({ accessToken })` - Retrieve the current user summary from the LLM service

### Mio (backend)

Backend SDK for server environments.

#### Methods

- `init(config: MioServerSDKInitConfig)` - Initialize the SDK singleton
- `getInstance()` - Get the initialized SDK instance (throws if not initialized)
- `exchangeCodeForTokens(code)` - Exchange an authorization code for tokens using the client secret
- `refreshTokens(refreshToken)` - Refresh access and refresh tokens using a refresh token
- `chat({ accessToken, query })` - Send a chat message to the LLM
- `getUserSummary({ accessToken })` - Retrieve the current user summary from the LLM service

### `useMio` hook (frontend)

React hook for frontend integration.

#### Returns

- `isLoading` - Boolean indicating loading state
- `error` - Error message if any
- `connect()` - Function to initiate the OAuth flow
- `handleMioCallback()` - Function to handle the OAuth callback and exchange the code
- `chat({ accessToken, query })` - Send a chat message to the LLM
- `getSummary({ accessToken })` - Retrieve the current user summary from the LLM service

## Configuration

Key minimal configuration types exposed by the SDK:

```typescript
interface MioClientSDKInitConfig {
  clientId: string;
  redirectUrl: string;
  exchangeTokenUrl: string;
}

interface MioServerSDKInitConfig {
  clientId: string;
  redirectUrl: string;
  clientSecret: string;
}
```
