import { createModuleFederationConfig } from '@module-federation/modern-js';
export default createModuleFederationConfig({
  name: 'host',
  manifest: {
    filePath: 'static',
  },
  filename: 'static/remoteEntry.js',

  remotes: {
    // ESM remote configuration - the remote is configured as ESM in its package.json
    remote: 'reactRemote@http://localhost:63640/remoteEntry.js',
  },
  exposes: {
    './List': './src/components/List.tsx',
  },
  
  shared: {
    react: { singleton: true, },
    'react-dom': { singleton: true,  },
  },
});