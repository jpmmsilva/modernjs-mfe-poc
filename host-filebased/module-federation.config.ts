import { createModuleFederationConfig } from '@module-federation/modern-js';
export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    // ESM remote configuration - the remote is configured as ESM in its package.json
    remote: 'reactRemote@http://localhost:63640/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.3.1' },
    'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
  },
});