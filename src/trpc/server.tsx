// server/trpc.ts
import 'server-only';

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';
import { createTRPCContext } from './init';  // adjust path
import { makeQueryClient } from './query-client'; // adjust path
import { appRouter } from './routers/_app'; // adjust path

// Cache the query client per request
export const getQueryClient = cache(makeQueryClient);

// This is the proxy used for client hooks (optional)
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

// Helper to create a tRPC caller on the server
export async function getCaller() {
  const ctx = await createTRPCContext();
  return appRouter.createCaller(ctx);
}
