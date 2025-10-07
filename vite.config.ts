/// <reference types="vitest" />
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@design-system': path.resolve(__dirname, './src/design-system/'),
            },
        },
        server: {
            port: 5173,
            watch: {
                ignored: ['**/db.json5'],
            },
        },
        test: {
            include: ['**/*.test.ts'],
            reportsDirectory: 'coverage',
            // globals: true,
            environment: 'node',
        },
        define: {
            // 'process.env.API_URL': JSON.stringify(env.API_URL),
        },
    };
});
