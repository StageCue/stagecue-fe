import { QueryClient } from '@tanstack/react-query';

let client: QueryClient;

export function setQueryClient(qc: QueryClient) {
  client = qc;
}

export function getQueryClient(): QueryClient {
  if (!client) throw new Error('QueryClient is not set');
  return client;
}
