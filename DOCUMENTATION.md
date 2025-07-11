# Modern.js Micro-Frontend Project Documentation

## Overview

This project demonstrates a micro-frontend architecture using Modern.js with Module Federation. The project consists of two applications:

1. **Host Application** (`host-filebased`) - The main application that loads and orchestrates micro-frontends
2. **React Remote** (`react-remote`) - A webpack-based micro-frontend with multiple exposed components

## Architecture

### Technology Stack

- **Framework**: Modern.js 2.68.2
- **Micro-frontend Solution**: Module Federation
- **Bundler**: Rspack (configurable to Webpack)
- **Language**: TypeScript (host), JavaScript (remote)
- **Package Manager**: pnpm (host), yarn (remote)
- **Linting**: Biome
- **Git Hooks**: simple-git-hooks with lint-staged

### Project Structure

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

## Applications

### 1. Host Application (`host-filebased`)

**Purpose**: Main application that serves as the container for micro-frontends.

**Key Features**:
- Uses Module Federation for micro-frontend orchestration
- Implements file-based routing with React Router
- Provides navigation to the react-remote micro-frontend
- Configures remote applications in module federation configuration

**Configuration**:
- **Port**: Default Modern.js port (likely 8080)
- **Bundler**: Rspack (configurable to Webpack)
- **Runtime**: Router enabled

**Module Federation Configuration**:
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

### 2. React Remote (`react-remote`)

**Purpose**: Webpack-based micro-frontend with multiple exposed components.

**Key Features**:
- Uses Webpack Module Federation
- Exposes multiple components (React, Vue, Solid.js)
- Runs on port 63640
- Supports multiple frameworks and component types

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

**Configuration**:
- **Port**: 63640
- **Bundler**: Webpack with Module Federation
- **Package Manager**: Yarn

## Getting Started

### Prerequisites

- Node.js >= 16.18.1
- pnpm (for host application)
- yarn (for react-remote)

### Installation

1. **Install Host Application**:
   ```bash
   cd host-filebased
   pnpm install
   ```

2. **Install React Remote**:
   ```bash
   cd react-remote
   yarn install
   ```

### Development

1. **Start React Remote** (Port 63640):
   ```bash
   cd react-remote
   yarn start
   ```

2. **Start Host Application** (Port 8080):
   ```bash
   cd host-filebased
   pnpm dev
   ```

3. **Access the Application**:
   - Open `http://localhost:8080` in your browser
   - Navigate to `/react-remote` to see the micro-frontend

### Available Scripts

**Host Application**:
- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `serve` - Preview production build
- `lint` - Run Biome linter
- `new` - Add new features or entries
- `upgrade` - Upgrade Modern.js dependencies

**React Remote**:
- `start` - Start development server
- `build` - Build for production
- `builddev` - Build for development
- `serve` - Serve production build
- `clean` - Clean dist directory

## Routing Architecture

### Host Application Routing

The host application uses file-based routing with the following structure:

- `/` - Home page
- `/react-remote` - Loads React Remote micro-frontend

### Micro-Frontend Integration

The react-remote application is loaded via Module Federation and provides multiple components that can be dynamically imported and used within the host application.

## Development Workflow

### Code Quality

The host application uses:
- **Biome** for linting and formatting
- **simple-git-hooks** for pre-commit hooks
- **lint-staged** for staged file processing

### TypeScript Configuration

- Uses `@modern-js/tsconfig` for consistent TypeScript configuration
- Strict type checking enabled
- Modern.js type definitions included

### Build Configuration

- **Development**: Hot module replacement enabled
- **Production**: Optimized builds with Rspack
- **Runtime**: Router and Module Federation integration

## Deployment

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

### Production Considerations

- Ensure react-remote is built and deployed
- Update remote entry URL in host configuration for production
- Configure proper CORS settings
- Set up proper domain routing

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Ensure ports 8080 and 63640 are available
2. **Module Loading**: Check that react-remote is running
3. **CORS Issues**: Verify CORS configuration in webpack dev server
4. **Build Errors**: Ensure all dependencies are properly installed

### Debugging

- Check browser console for module federation errors
- Verify network requests to remote entry
- Use Modern.js dev tools for debugging

## Best Practices

### Micro-Frontend Development

1. **Isolation**: Keep micro-frontends as independent as possible
2. **Shared Dependencies**: Use Module Federation for shared libraries
3. **Component Design**: Design components for reusability
4. **Error Handling**: Implement proper error boundaries

### Host Application

1. **Configuration**: Centralize micro-frontend configuration
2. **Error Handling**: Implement proper error boundaries
3. **Loading States**: Provide loading indicators for micro-frontends
4. **Performance**: Optimize loading and caching strategies

## Future Enhancements

### Potential Improvements

1. **Shared Component Library**: Create a shared component library
2. **State Management**: Implement global state management solution
3. **Testing**: Add comprehensive testing strategy
4. **CI/CD**: Set up automated deployment pipeline
5. **Monitoring**: Add application performance monitoring

### Scalability Considerations

1. **Dynamic Loading**: Implement dynamic micro-frontend loading
2. **Caching**: Add proper caching strategies
3. **Security**: Implement proper security measures
4. **Performance**: Optimize bundle sizes and loading times

## Resources

- [Modern.js Documentation](https://modernjs.dev/en)
- [Module Federation Guide](https://webpack.js.org/concepts/module-federation/)
- [React Router Documentation](https://reactrouter.com/)

## Support

For issues and questions:
1. Check the Modern.js documentation
2. Review Module Federation troubleshooting guide
3. Check browser console for detailed error messages
4. Verify all applications are running on correct ports 