import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';
// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  namespace: 'red',
  outputTargets: [
    react({
      componentCorePackage: 'red-ui',
      proxiesFile: '../red-ui-react/src/components/stencil-generated/index.ts',
      excludeComponents: ['context-consumer'],
      includePolyfills: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
  ],
};
