# Modern.js Micro-Frontend POC

A proof-of-concept demonstrating micro-frontend architecture using Modern.js with Module Federation. This project showcases a host application that loads components from a webpack-based remote application.

## 🏗️ Architecture Overview

This project consists of two independent applications that work together to create a seamless micro-frontend experience:

```
┌─────────────────┐    ┌─────────────────┐
│   Host App      │    │  React Remote   │
│  (Port 8080)    │◄──►│  (Port 63640)   │
│                 │    │                 │
│ • Orchestrates  │    │ • Webpack-based │
│ • Loads MFs     │    │ • Multiple      │
│ • Navigation    │    │   components    │
│ • TypeScript    │    │ • React/Vue/    │
│                 │    │   Solid.js      │
└─────────────────┘    └─────────────────┘
```

### Applications

| Application | Type | Port | Technology | Purpose |
|-------------|------|------|------------|---------|
| **host-filebased** | Host | 8080 | Modern.js + TypeScript | Main orchestrator |
| **react-remote** | Remote | 63640 | Webpack + JavaScript | Component library |

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.18.1
- pnpm (for host application)
- yarn (for react-remote)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd poc-modernjs
   ```

2. **Install all applications**
   ```bash
   # Host application
   cd host-filebased
   pnpm install
   
   # React remote
   cd ../react-remote
   yarn install
   ```

3. **Start all applications**
   ```bash
   # Terminal 1: Start react remote (Port 63640)
   cd react-remote
   yarn start
   
   # Terminal 2: Start host application (Port 8080)
   cd host-filebased
   pnpm dev
   ```

4. **Access the application**
   - Open `http://localhost:8080` in your browser
   - Navigate to `/react-remote` to see the micro-frontend components

## 🔗 How Applications Connect

### 1. Host Application (`host-filebased`)

The host application serves as the **orchestrator** and **container** for the micro-frontend.

**Key Responsibilities**:
- Loads and manages micro-frontend components
- Provides navigation to the micro-frontend
- Handles routing coordination
- Manages shared dependencies

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

### 2. React Remote (`react-remote`)

A **webpack-based** micro-frontend that provides multiple components.

**Key Characteristics**:
- Uses Webpack Module Federation
- Exposes multiple component types (React, Vue, Solid.js)
- Runs on port 63640
- Supports various component patterns

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
- Loaded by host application via Module Federation
- Components can be dynamically imported
- Supports multiple frameworks and patterns

## 🛣️ Routing Architecture

### Host Application Routing

The host uses file-based routing with the following structure:

```
/                    → Home page
└── /react-remote   → Loads React Remote micro-frontend
```

### Micro-Frontend Integration

The react-remote application provides components that can be dynamically loaded and used within the host application through Module Federation.

## 🔄 Communication Flow

```
┌─────────────┐    HTTP Request    ┌─────────────┐
│    Host     │ ──────────────────► │ React Remote│
│  (Port 8080) │                    │ (Port 63640)│
│             │ ◄────────────────── │             │
└─────────────┘    Module Load     └─────────────┘
```

### Loading Process

1. **User Navigation**: User navigates to `/react-remote` in the host application
2. **Route Matching**: Host application matches the route to the micro-frontend
3. **Module Loading**: Module Federation loads the remote entry
4. **Component Rendering**: Micro-frontend components render within the host
5. **Dynamic Import**: Components are loaded on-demand

## 🛠️ Development Workflow

### Adding New Features

1. **Host Application**:
   - Add new routes in `src/routes/`
   - Configure new remotes in `module-federation.config.ts`
   - Update navigation in layout component

2. **React Remote**:
   - Add new components in `src/`
   - Expose components in `webpack.config.js`
   - Update component exports

### Development Commands

**Host Application**:
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm serve        # Preview production build
pnpm lint         # Run Biome linter
pnpm new          # Add new features
pnpm upgrade      # Upgrade Modern.js dependencies
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
├── host-filebased/          # Main host application
│   ├── src/
│   │   ├── routes/
│   │   │   ├── layout.tsx   # Main layout with navigation
│   │   │   ├── page.tsx     # Home page
│   │   │   └── react-remote/
│   │   │       └── $.tsx    # React remote micro-frontend loader
│   │   └── modern-app-env.d.ts # TypeScript declarations
│   ├── modern.config.ts     # Modern.js configuration
│   └── module-federation.config.ts # Module Federation configuration
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

- **Host**: 8080 (default Modern.js port)
- **React Remote**: 63640 (explicitly configured)

### Module Federation Configuration

The host application uses Module Federation for micro-frontend functionality:

```typescript
// In modern.config.ts
plugins: [
  appTools({
    bundler: 'rspack',
  }),
  moduleFederationPlugin()
],
```

## 🚀 Deployment

### Build Process

1. **Build React Remote**:
   ```bash
   cd react-remote
   yarn build
   ```

2. **Build Host Application**:
   ```bash
   cd host-filebased
   pnpm build
   ```

3. **Deploy all applications** to your hosting platform

### Production Considerations

- Update remote entry URL in host configuration for production
- Configure proper CORS settings
- Set up proper domain routing
- Ensure react-remote is accessible

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**:
   - Ensure ports 8080 and 63640 are available
   - Check if other applications are using these ports

2. **Module Loading Issues**:
   - Verify react-remote is running
   - Check browser console for module federation errors
   - Ensure proper CORS configuration

3. **CORS Issues**:
   - Verify CORS configuration in webpack dev server
   - Check network requests in browser dev tools

### Debugging

- **Browser Console**: Check for JavaScript errors and module loading issues
- **Network Tab**: Verify HTTP requests to remote entry
- **React DevTools**: Debug component hierarchy and props
- **Modern.js Dev Tools**: Use Modern.js debugging features

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
- Test integration between applications

## 📖 Resources

- [Modern.js Documentation](https://modernjs.dev/en)
- [Module Federation Guide](https://webpack.js.org/concepts/module-federation/)
- [React Router Documentation](https://reactrouter.com/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:

1. Check the application-specific documentation
2. Review the Modern.js and Module Federation documentation
3. Check browser console for detailed error messages
4. Verify all applications are running on correct ports
5. Ensure proper integration between applications

---

**Note**: This is a proof-of-concept demonstrating micro-frontend architecture using Module Federation. For production use, consider additional security, performance, and monitoring requirements. 