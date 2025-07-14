# Modern.js Micro-Frontend POC

A comprehensive proof-of-concept demonstrating micro-frontend architecture using Modern.js with Module Federation. This project showcases multiple host applications that can load components from webpack-based remote applications, demonstrating different approaches to micro-frontend implementation.

## 🏗️ Architecture Overview

This project consists of multiple independent applications that work together to create a seamless micro-frontend experience:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Modern.js Host │    │  React Remote   │    │  React Host     │
│  (Port 8080)    │◄──►│  (Port 63640)   │◄──►│  (Port 3001)    │
│                 │    │                 │    │                 │
│ • Modern.js     │    │ • Webpack-based │    │ • Webpack-based │
│ • TypeScript    │    │ • Multiple      │    │ • React         │
│ • File-based    │    │   components    │    │ • JavaScript    │
│   routing       │    │ • React/Vue/    │    │ • Host app      │
│                 │    │   Solid.js      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Applications

| Application | Type | Port | Technology | Purpose |
|-------------|------|------|------------|---------|
| **host-filebased** | Host | 8080 | Modern.js + TypeScript | Main orchestrator with file-based routing |
| **react-remote** | Remote | 63640 | Webpack + JavaScript | Component library with multiple frameworks |
| **react-host** | Host | 3001 | Webpack + React | Alternative host using webpack |

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.18.1
- pnpm (for Modern.js host application)
- yarn (for webpack-based applications)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd poc-modernjs
   ```

2. **Install all applications**
   ```bash
   # Modern.js Host application
   cd host-filebased
   pnpm install
   
   # React Remote (component library)
   cd ../react-remote
   yarn install
   
   # React Host application
   cd ../react-host
   yarn install
   ```

3. **Start all applications**
   ```bash
   # Terminal 1: Start react remote (Port 63640)
   cd react-remote
   yarn start
   
   # Terminal 2: Start Modern.js host (Port 8080)
   cd host-filebased
   pnpm dev
   
   # Terminal 3: Start React host (Port 3001)
   cd react-host
   yarn start
   ```

4. **Access the applications**
   - Modern.js Host: `http://localhost:8080`
   - React Host: `http://localhost:3001`
   - Navigate to `/react-remote` in either host to see micro-frontend components

## 🔗 How Applications Connect

### 1. Modern.js Host Application (`host-filebased`)

The Modern.js host application serves as the **primary orchestrator** with advanced features.

**Key Characteristics**:
- Built with Modern.js framework
- TypeScript support
- File-based routing
- Advanced Module Federation integration
- Built-in development tools

**Configuration** (`module-federation.config.ts`):
```typescript
export default createModuleFederationConfig({
  name: 'host',
  remotes: {
    remote: 'reactRemote@http://localhost:63640/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.3.1' },
    'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
  },
});
```

**Loading Micro-Frontend Components**:
```typescript
// In route components
import { useModuleApps } from '@module-federation/modern-js/runtime';

const { remote } = useModuleApps();

// Usage
<remote.Button />
<remote.VueComponent />
<remote.SolidComponent />
```

### 2. React Host Application (`react-host`)

A **webpack-based host** that demonstrates an alternative approach to micro-frontend hosting.

**Key Characteristics**:
- Pure webpack configuration
- React-based host application
- JavaScript implementation
- Alternative to Modern.js approach
- Runs on port 3001

**Configuration** (`webpack.config.js`):
```javascript
new ModuleFederationPlugin({
  name: 'HostApp',
  remotes: {
    modernJsRemote: `host@http://localhost:8080/static/remoteEntry.js`,
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps["react-dom"] },
  }
})
```

### 3. React Remote (`react-remote`)

A **webpack-based micro-frontend** that provides multiple components for both host applications.

**Key Characteristics**:
- Uses Webpack Module Federation
- Exposes multiple component types (React, Vue, Solid.js)
- Runs on port 63640
- Supports various component patterns
- Serves both host applications

**Exposed Components**:
- `./Button` - React button component
- `./VueComponent` - Vue component wrapper
- `./UnwrappedVueComponent` - Direct Vue component
- `./SolidComponent` - Solid.js component
- `./ComponentError` - Error boundary component
- `./DelayedComponent` - Async loading component
- `./PlainJavascriptComponent` - Plain JavaScript component
- `./ShadowStyleComponent` - Component with shadow DOM styles
- `./DestructiveStyleComponent` - Component with conflicting styles
- `./ReactVersionComponent` - React version display
- `./ForwardRefComponent` - Forward ref component

**Integration**:
- Loaded by both host applications via Module Federation
- Components can be dynamically imported
- Supports multiple frameworks and patterns

## 🛣️ Routing Architecture

### Modern.js Host Routing

The Modern.js host uses file-based routing with the following structure:

```
/                    → Home page
└── /react-remote   → Loads React Remote micro-frontend
```

### React Host Routing

The React host uses standard React Router for navigation and component loading.

### Micro-Frontend Integration

The react-remote application provides components that can be dynamically loaded and used within both host applications through Module Federation.

## 🔄 Communication Flow

```
┌─────────────┐    HTTP Request    ┌─────────────┐    HTTP Request    ┌─────────────┐
│ Modern.js   │ ──────────────────► │ React Remote│ ◄───────────────── │ React Host  │
│ Host        │                    │             │                    │             │
│ (Port 8080) │ ◄────────────────── │ (Port 63640)│ ──────────────────► │ (Port 3001)│
└─────────────┘    Module Load     └─────────────┘    Module Load     └─────────────┘
```

### Loading Process

1. **User Navigation**: User navigates to micro-frontend routes in either host
2. **Route Matching**: Host application matches the route to the micro-frontend
3. **Module Loading**: Module Federation loads the remote entry
4. **Component Rendering**: Micro-frontend components render within the host
5. **Dynamic Import**: Components are loaded on-demand

## 🛠️ Development Workflow

### Adding New Features

1. **Modern.js Host Application**:
   - Add new routes in `src/routes/`
   - Configure new remotes in `module-federation.config.ts`
   - Update navigation in layout component

2. **React Host Application**:
   - Add new routes in React Router configuration
   - Configure new remotes in `webpack.config.js`
   - Update component imports

3. **React Remote**:
   - Add new components in `src/`
   - Expose components in `webpack.config.js`
   - Update component exports

### Development Commands

**Modern.js Host Application**:
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm serve        # Preview production build
pnpm lint         # Run Biome linter
pnpm new          # Add new features
pnpm upgrade      # Upgrade Modern.js dependencies
pnpm reset        # Reset all node_modules
```

**React Host Application**:
```bash
yarn start        # Start development server
yarn build        # Build for production
yarn serve        # Serve production build
yarn clean        # Clean dist directory
```

**React Remote**:
```bash
yarn start        # Start development server
yarn build        # Build for production
yarn builddev     # Build for development
yarn serve        # Serve production build
yarn clean        # Clean dist directory
```

## 📁 Project Structure

```
poc-modernjs/
├── host-filebased/          # Modern.js host application
│   ├── src/
│   │   ├── routes/
│   │   │   ├── layout.tsx   # Main layout with navigation
│   │   │   ├── page.tsx     # Home page
│   │   │   └── react-remote/
│   │   │       └── $.tsx    # React remote micro-frontend loader
│   │   └── modern-app-env.d.ts # TypeScript declarations
│   ├── modern.config.ts     # Modern.js configuration
│   └── module-federation.config.ts # Module Federation configuration
├── react-host/              # Webpack-based React host
│   ├── src/
│   │   ├── index.js         # Application entry point
│   │   └── App.js           # Main app component
│   ├── webpack.config.js    # Webpack configuration
│   └── public/
│       └── index.html       # HTML template
└── react-remote/            # React micro-frontend
    ├── src/
    │   ├── App.js           # Main app component
    │   ├── Button.js        # Exposed button component
    │   ├── VueComponent.js  # Vue component wrapper
    │   ├── VueComponent.vue # Vue component
    │   ├── SolidComponent.solid.jsx # Solid.js component
    │   └── ...              # Other exposed components
    ├── webpack.config.js    # Webpack configuration
    └── public/
        └── index.html       # HTML template
```

## 🔧 Configuration

### Port Configuration

Each application runs on a specific port to avoid conflicts:

- **Modern.js Host**: 8080 (default Modern.js port)
- **React Host**: 3001 (explicitly configured)
- **React Remote**: 63640 (explicitly configured)

### Module Federation Configuration

Both host applications use Module Federation for micro-frontend functionality:

**Modern.js Host**:
```typescript
// In modern.config.ts
plugins: [
  appTools({
    bundler: 'rspack',
  }),
  moduleFederationPlugin()
],
```

**React Host**:
```javascript
// In webpack.config.js
new ModuleFederationPlugin({
  name: 'HostApp',
  remotes: {
    modernJsRemote: `host@http://localhost:8080/static/remoteEntry.js`,
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps["react-dom"] },
  }
})
```

## 🚀 Deployment

### Build Process

1. **Build React Remote**:
   ```bash
   cd react-remote
   yarn build
   ```

2. **Build Modern.js Host**:
   ```bash
   cd host-filebased
   pnpm build
   ```

3. **Build React Host**:
   ```bash
   cd react-host
   yarn build
   ```

4. **Deploy all applications** to your hosting platform

### Production Considerations

- Update remote entry URLs in host configurations for production
- Configure proper CORS settings
- Set up proper domain routing
- Ensure react-remote is accessible from both hosts
- Consider load balancing for multiple host applications

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**:
   - Ensure ports 8080, 3001, and 63640 are available
   - Check if other applications are using these ports

2. **Module Loading Issues**:
   - Verify react-remote is running
   - Check browser console for module federation errors
   - Ensure proper CORS configuration

3. **CORS Issues**:
   - Verify CORS configuration in webpack dev server
   - Check network requests in browser dev tools

4. **Host Application Conflicts**:
   - Ensure both hosts are not trying to load the same remote simultaneously
   - Check for shared dependency conflicts

### Debugging

- **Browser Console**: Check for JavaScript errors and module loading issues
- **Network Tab**: Verify HTTP requests to remote entry
- **React DevTools**: Debug component hierarchy and props
- **Modern.js Dev Tools**: Use Modern.js debugging features
- **Webpack Dev Tools**: Use webpack debugging for webpack-based applications

## 📚 Documentation

- [General Project Documentation](./DOCUMENTATION.md)
- [Host Application README](./host-filebased/README.md)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test all applications**
5. **Submit a pull request**

### Development Guidelines

- Follow the existing code structure and patterns
- Maintain micro-frontend isolation
- Use consistent naming conventions
- Add appropriate documentation
- Test integration between all applications
- Ensure compatibility with both host applications

## 📖 Resources

- [Modern.js Documentation](https://modernjs.dev/en)
- [Module Federation Guide](https://webpack.js.org/concepts/module-federation/)
- [React Router Documentation](https://reactrouter.com/)
- [Webpack Documentation](https://webpack.js.org/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:

1. Check the application-specific documentation
2. Review the Modern.js and Module Federation documentation
3. Check browser console for detailed error messages
4. Verify all applications are running on correct ports
5. Ensure proper integration between applications
6. Test with both host applications to isolate issues

---

**Note**: This is a proof-of-concept demonstrating micro-frontend architecture using Module Federation with multiple host applications. For production use, consider additional security, performance, monitoring, and deployment requirements. 