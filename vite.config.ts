import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ITransaction } from './src/types/transactions';
import jsonServer from 'vite-plugin-simple-json-server';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['fs'],
    }),
    jsonServer({
      urlPrefixes: ['/api/'],
      handlers: [
        {
          pattern: '/api/transactions-summary',
          handle: (_req, res) => {
            const transactions = JSON.parse(
              fs.readFileSync('mock/transactions.json', 'utf-8')
            );

            const result = (transactions as ITransaction[]).reduce(
              (acc, curr) => ({
                amount: curr.amount + acc.amount,
                count: acc.count + 1,
              }),
              { amount: 0, count: 0 }
            );

            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(result));
          },
        },
      ],
    }),
  ],
});
