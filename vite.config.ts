import { defineConfig } from 'vite';
import packageJSON from './package.json';
// import { analyzer } from 'vite-bundle-analyzer'

const isSiteMode = process.env.EAI_EXPORT_SITE === '1';

export default defineConfig(({ command }) => {
    if (isSiteMode || command === 'serve') {
        // For site and dev builds - use the demo page
        return {
            build: {
                rollupOptions: {
                    output: {
                        compact: true,
                        // Split three and react into distinct vendor chunks
                        manualChunks(id) {
                            if (id.includes('three.core')) {
                                return 'three.core';
                            }

                            if (id.includes('three.module')) {
                                return 'three.module';
                            }

                            if (id.includes('react')) {
                                return 'react';
                            }

                            return null;
                        },
                    },
                    treeshake: {
                        unknownGlobalSideEffects: false,
                        propertyReadSideEffects: false,
                        correctVarValueBeforeDeclaration: true
                    },
                }
            },
            plugins: [
                //  analyzer()
            ],
        };
    }

    // For standard build - just impl. the library directly
    return {
        build: {
            lib: {
                entry: './src/Emblem.tsx',
                name: 'emblem'
            },
            rollupOptions: {
                external: [
                    // All runtime deps should be external
                    ...Object.keys(packageJSON.dependencies),
                    // Vite includes this (fun)
                    'react/jsx-runtime'
                ],
                output: {
                    format: 'esm',
                    globals: {
                        'react': 'react',
                        'react/jsx-runtime': 'react/jsx-runtime',
                    },
                },
            },
        },
    }
})